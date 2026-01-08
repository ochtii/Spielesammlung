/**
 * QuizGame - Quiz Game Implementation
 * Extends GameEngine for multiple-choice quizzes
 */
class QuizGame extends GameEngine {
    constructor(config) {
        super(config);
        this.data = config.data || [];
        this.questionGenerator = config.questionGenerator || null;
    }

    /**
     * Set quiz data
     * @param {Array} data 
     */
    setData(data) {
        this.data = data;
    }

    /**
     * Set question generator function
     * @param {Function} generator 
     */
    setQuestionGenerator(generator) {
        this.questionGenerator = generator;
    }

    /**
     * Generate questions from data
     * @returns {Array}
     */
    generateQuestions() {
        if (!this.data.length || !this.questionGenerator) {
            console.error('QuizGame: Missing data or questionGenerator');
            return [];
        }

        const shuffledData = this.shuffle(this.data);
        const count = Math.min(this.config.questionCount, shuffledData.length);
        const selectedData = shuffledData.slice(0, count);

        return selectedData.map(item => {
            const question = this.questionGenerator(item, this.data);
            return {
                question: question.question,
                correct: question.correct,
                options: this.shuffle(question.options)
            };
        });
    }

    /**
     * Generate wrong options from data
     * @param {*} correctItem - The correct item
     * @param {Function} valueGetter - Function to get value from item
     * @param {number} count - Number of wrong options
     * @returns {string[]}
     */
    getWrongOptions(correctItem, valueGetter, count = 3) {
        const correctValue = valueGetter(correctItem);
        const otherItems = this.data.filter(item => valueGetter(item) !== correctValue);
        const shuffled = this.shuffle(otherItems);
        return shuffled.slice(0, count).map(valueGetter);
    }
}

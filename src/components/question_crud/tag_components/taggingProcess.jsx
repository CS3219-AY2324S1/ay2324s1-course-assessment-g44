export const filterQuestions = (unfilteredQuestions, filters) => {
    if (filters === null || unfilteredQuestions === null) {
        return unfilteredQuestions;
    }

    const completeFilter = filters.completeFilter;
    const difficultyFilter = filters.difficultyFilter;
    const titleFilter = filters.titleFilter;
    const categoryFilter = filters.categoryFilter;

    const filteredByComplete = filterByComplete(unfilteredQuestions, completeFilter);
    const filteredByDifficulty = filterByDifficulty(filteredByComplete, difficultyFilter);
    const filteredByTitle = filterByTitle(filteredByDifficulty, titleFilter);
    const filteredByAll = filterByCategory(filteredByTitle, categoryFilter);

    return filteredByAll;
}

const filterByComplete = (questions, filter) => {
    if (filter === 'any') {
        return questions;
    }
    if (questions === null) {
        return null;
    }

    const wantsCompleted = filter === 'completed' ? true : false;

    const res = questions.filter(q => q.completed === wantsCompleted);

    return res;
}

const filterByDifficulty = (questions, filter) => {
    if (filter === 'any') {
        return questions;
    }
    if (questions === 'null') {
        return null;
    }

    const res = questions.filter(q => q.difficulty === filter);
    
    return res;
}


const filterByTitle = (questions, filter) => {
    if (filter === '') {
        return questions;
    }
    if (questions === 'null') {
        return null;
    }
    
    const res = questions.filter(q => q.title.toLowerCase().includes(filter.toLowerCase()));
    return res;
}

const filterByCategory = (questions, filter) => {
    if (filter === '') {
        return questions;
    }
    if (questions === 'null') {
        return null;
    }

    const res = questions.filter(q => q.category.toLowerCase().includes(filter.toLowerCase()));
    return res;
}

export const NOFILTER = {
    completeFilter: "any",
    difficultyFilter: "any",
    titleFilter: "",
    categoryFilter: "",
};
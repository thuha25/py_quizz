export class QuizService {
    host_url = import.meta.env.VITE_QUIZAPP_API_URL
    
    constructor() {}
    async getQuizzes() {
        return fetch(`${this.host_url}/quizzes`).then(res => res.json())
    }

    async getQuizzesByUser(user) {
        return fetch(`${this.host_url}/quizzes?author_id=${user.id}`).then(res => res.json())
    }

    async getQuizById(id) {
        return fetch(`${this.host_url}/quizzes/${id}`).then(res => res.json())
    }

    async createQuiz(title, description) {
        var access_token = localStorage.getItem("PYQUIZ_ACCESS");
        if(access_token == null)
            return Promise.reject("Not login yet");
        return fetch(`${this.host_url}/quizzes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token 
            },
            body: JSON.stringify({
                title: title,
                description: description,
            }),
        })
    }

    async createQuestion(quizId, question) {
        var access_token = localStorage.getItem("PYQUIZ_ACCESS");
        if(access_token == null)
            return Promise.reject("Not login yet");
        return fetch(`${this.host_url}/quizzes/${quizId}/questions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': access_token 
            },
            body: JSON.stringify(question),
          })
    }

    async deleteQuestion(questionId) {
        return fetch(`${this.host_url}/questions/${questionId}`, {
            method: 'DELETE',
        })
    }
}
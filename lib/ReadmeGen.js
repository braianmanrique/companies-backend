class MarkDown {
    static generateReadme(answeres){
        return `
        # ${anwers.title}

        ## Table of content
        -[Project description](#Description)
        -[Usage](#Installation)
        -[License](#License)

        ## Description
        ${answers.description}
        ${answers.github}

        ## Installation
        ${answers.installation}

        `
    }
}
modue.exports = MarkDown
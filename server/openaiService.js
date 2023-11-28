import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: ""
});

export const apiDetails = {
    overview: {
        purpose: "library management system", // User input for purpose
        functionalities: [""], // User input for functionalities
    },
    functions: ["addBook(bookDetails: Book): Observable<Book>",
        "getAllBooks(): Observable<Book[]>",
        "getBookById(bookId: number): Observable<Book>",
        "updateBook(bookId: number, bookDetails: Book): Observable<Book>",
        "deleteBook(bookId: number): Observable<void>",
        "registerUser(userDetails: User): Observable<User>]"], // Array of endpoint objects based on user input
    authentication: {
        methods: ["Auth2.0"], // User input for authentication methods
        steps: "" // User input for authentication steps
    },
};


export const createPrompts = (apiDetails) => {
    const prompts = [];

    // Add overview prompt
    if (apiDetails.overview.purpose) {
        prompts.push({
            content: `Generate a concise overview of a REST API designed for ${apiDetails.overview.purpose}. Include its primary purpose and key functionalities such as ${apiDetails.overview.functionalities.join(', ')}.`,
            role: "system"
        });
    }

    apiDetails.functions.forEach(func => {
        // Extracting the function name and parameters
        const [funcName, params] = func.split('(');
        const cleanFuncName = funcName.trim();
        const cleanParams = params.split(')')[0];

        const paramDescription = cleanParams ? `with parameters ${cleanParams}` : "without any parameters";

        prompts.push({
            content: `Describe the REST API endpoint corresponding to the function '${cleanFuncName}' ${paramDescription}. Include details such as the expected request format and response format.`,
            role: "system"
        });
    });

    // Add authentication mechanism prompt
    if (apiDetails.authentication.methods.length > 0) {
        prompts.push({
            content: `Explain the authentication mechanism used in a REST API for secure transactions. Focus on the types of authentication supported like ${apiDetails.authentication.methods.join(' and ')}, and steps for a user to authenticate their requests.`,
            role: "system"
        });
    }

    return prompts;
};

// Example function call after user inputs are collected
const messages = createPrompts(apiDetails);

const getGptResponse =  async (messages) => await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
});

// Pass the messages to the OpenAI agent
 getGptResponse(messages).then(response => {
    console.log(response); // Process the response
}).catch(error => {
    console.error(error);
});

export default getGptResponse;
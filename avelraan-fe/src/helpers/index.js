export const ERROR_NAME = {
    serverError: 'ServerError',
    customError: 'CustomError'
}

export const PAGES = {
    home: {
        index: 'Home'
    },
    characters: {
        index: 'Characters',
        myCharacters: 'My Characters',
        model: 'Model',
        levelUp: 'Level Up',
        create: 'Create'
    },
    party: {
        index: 'Party'
    },
    items: {
        index: 'Items'
    },
    merchant: {
        index: 'Merchant'
    },
    fame: {
        index: 'Fame'
    }
};

export const throwServerError = (status) => {
    throw { name: ERROR_NAME.serverError, status }
}

export const throwCustomError = (message) => {
    throw { name: ERROR_NAME.customError, message }
}

export const getErrorText = (error) => {
    if (error === null || typeof error === 'undefined') return null;
    else if (error.name === ERROR_NAME.customError) {
        switch (error.message) {
            case 'ResourceNotFound: the symbol ward matched no player.':
                return 'The username, ward or symbol is invalid.'
            case 'Failure: player already exists.':
                return 'A player with such username already exists. Please try another one.'
            default:
                return error.message;
        }
    }
    else if (error.name === ERROR_NAME.serverError) {
        switch (error.status) {
            case 500:
                return 'The server has encountered an unexpected error.';
            case 400:
                return 'The request could not be processed by the server.';
            case 404:
                return 'The server has not found anything matching the request.';
            case 415:
                return 'The request format is not supported.';
            case 401:
                return 'Session expired. Please refresh the page and sign in again.';
            case 403:
                return 'You do not have the necessary permissions to access this resource.';
            default:
                return 'Something went wrong, please try again later'
        }
    }
    else {
        return 'Something went wrong, please try again later';
    }
}

export const isCustomError = (error) => {
    return error.name === ERROR_NAME.customError;
}
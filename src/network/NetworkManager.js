import NetworkUtil from './NetworkUtil'

function callAPI(url, methodType, dataParams) {
    return NetworkUtil({
        url: url,
        method: methodType,
        data: dataParams
    }, true)
}

const NetworkManager = {
    callAPI
}

export default NetworkManager;
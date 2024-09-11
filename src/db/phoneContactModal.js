export default class phoneContactModal {
    "_ID" = ''
    "JEWELCHAT_ID" = ''
    "JID" = ''
    "CONTACT_NUMBER" = ''
    "CONTACT_NAME" = ''
    "PHONEBOOK_CONTACT_NAME" = ''
    "IS_GROUP" = ''
    "STATUS_MSG" = ''
    "IS_REGIS" = ''
    "IS_GROUP_ADMIN" = ''
    "IS_INVITED" = ''
    "IS_BLOCKED" = ''
    "IS_PHONEBOOK_CONTACT" = ''
    "UNREAD_COUNT" = ''
    "LAST_MSG_CREATED_TIME" = ''
    "MSG_TYPE" = ''
    "MSG_TEXT" = ''
    "SMALL_IMAGE" = ''
    "IMAGE_PATH" = ''

    constructor(jsonObj) {
        this.PHONEBOOK_CONTACT_NAME = jsonObj.givenName + " " + jsonObj.middleName + " " + jsonObj.familyName
        this.CONTACT_NUMBER = _formatNumber(jsonObj.phoneNumbers[0].number)
        this.JID = _formatNumber(jsonObj.phoneNumbers[0].number) + '@jewelchat.net'
        this.IS_PHONEBOOK_CONTACT = 1
        this.IS_REGIS = 0
        this.IS_INVITED = 0
    }
}

function _formatNumber(number) {
    //var formattedNumber = ''
    // if (number.includes('(')) {
    // 	formattedNumber = '91' + number.split('-')[0].split(') ')[0].split('(')[1] + number.split('-')[0].split(') ')[1] + number.split('-')[1]
    // 	console.log(formattedNumber)
    // }
    // else if (number.includes('+')) {
    // 	formattedNumber = number.split(' ')[0].split('+')[1] + number.split(' ')[1] + number.split(' ')[2]
    // 	console.log(formattedNumber)
    // }
    // else if(number.includes('-')){
    //     formattedNumber = '91' + number.split('-')[0] + number.split('-')[1] + number.split('-')[2]
    // }
    // else
    // 	formattedNumber = number


    // for (let i = 0; i < number.length; i++) {
    //     if (!isNaN(number[i]) && number[i]!=' ')
    //         formattedNumber = formattedNumber + number[i]
    // }
    // if(formattedNumber.length==10){
    //     formattedNumber ='91'+ formattedNumber
    // }

    const regex1 = /\D/g;
    const regex2 = /^0+/g;

    return '91' + number.replaceAll(regex1,'').replace(regex2,'');
    
}
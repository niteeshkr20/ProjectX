import db from '../../db/localdatabase';



export const insertIncomingAffiliationsViaHistoryDownload = (affiliationMessage) => {

	return (dispatch, getState) => {
		db.insertAffiliations(affiliationMessage).then((result) => {
			affiliationMessage['_ID'] = result          

		}).catch(err => {

		})
	}

}



export const insertIncomingAffiliations = (affiliationMessage) => {

	return (dispatch, getState) => {
		db.insertAffiliations(affiliationMessage).then((result) => {
			affiliationMessage['_ID'] = result
			
			dispatch(updateChatPageRedux);            

		}).catch(err => {

		})
	}

}
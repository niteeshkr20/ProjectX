//import db from '../../db/localdatabase';
//import actions from '../../actions';
import {updateChatPageRedux, updateChatlistRedux} from './messages';
import {getConnectionObj} from './realtimeobj';


export const downloadMessages = (lastlogouttime, last=null ) => {
    console.log('DOWNLOAD MESSAGES', lastlogouttime)
    console.log('LAST MESSAGE', last)
    return (dispatch, getState) => {                

                var download = $iq({ type: 'set' })
                    .c('query', { xmlns: 'urn:xmpp:mam:2' })
                        .c('x', { xmlns: 'jabber:x:data', type: 'submit' })
                            .c('field', { var: 'FORM_TYPE', type: 'hidden' })
                                .c('value').t('urn:xmpp:mam:2')
                                .up()
                            .up()
                            .c('field', { var: 'start' })
                                .c('value').t(new Date(parseInt(lastlogouttime)).toISOString())
                            .up()
                        .up()
                    .up()
                    .c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
                        .c('max').t('10');

                        if(last)
                            download = download.up().c('after').t(last).up();
                        console.log('DOWNLOAD QUERY',download.toString())
                        getConnectionObj().sendIQ(download.tree(), (stanza) => {
                        //console.log('CALLBACK SEND IQ')
                        //console.log(stanza.toString())

                        //update redux active chat and chat list.....don't know if this is a good idea

                        dispatch(updateChatPageRedux());
                        dispatch(updateChatlistRedux());

                        var lastElement = stanza.getElementsByTagName('last')
                        if (lastElement.toString()) {
                            var last = Strophe.getText(lastElement[0])
                            dispatch(downloadMessages(lastlogouttime, last));
                        }else{
                            
                            global.dowloadMessagesComplete = true;
                            console.log('DOWNLOAD MESSAGES COMPLETE', global.dowloadMessagesComplete)
                        }
                        
                    });       

    }

}


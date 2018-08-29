const helper = {
    trim:function(sStr){
        return sStr.replace(/^[\s]+|[\s]+$/ig,"");
    },
    findValInQueryString:function(sStr,sParam){
        let sRslt="",mt=null;
        const re = new RegExp("[?]"+sParam+"="+"([^&]+)","ig");
        while ((mt=re.exec(sStr)) !== null){
            sRslt=mt[1];
        }
        return sRslt;
    }
}
export default helper;
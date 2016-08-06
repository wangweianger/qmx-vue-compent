// 过滤器
module.exports={
	//limitTo过滤器
	limitTo:function(value,num){
		var text="";
		if(value){
			if(value.length<num){
				text=value;
			}else{
				text=value.substring(0,num)+'···';
			}
		}
	  	return text;
	},

	//下拉loading过滤器
	loadingStatusFilter:function(value){
		var strText="";
		switch(value){
			case 1:
				strText='下滑加载更多···';
				break;
			case 2:
				strText='加载中···';
				break;
			case 3:
				strText='已经到底了';
				break;
		}
		return strText;	
	},

}




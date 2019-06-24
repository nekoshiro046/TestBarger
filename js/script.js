var pageNum;

$(function(){

	$('#opening').click(function(){
		$('#wt_p1').css('display','block');
		$('#right_icon').css('display','block');
		$('#overlay').css('display','block');
		$('#opening').css('display','none');
		$('#close_icon').css('display','block');


		pageNum = 1;

	});

	$('#right_icon').click(function(){
		$('#right_icon').css('display','block');
		$('#left_icon').css('display','block');

		$('#wt_p'+pageNum).css('display','none');
		$('#wt_p'+(pageNum+1)).css('display','block');
		pageNum++;
		if(pageNum==3){
			$('#right_icon').css('display','none');
		}
	});

	$('#left_icon').click(function(){
		$('#right_icon').css('display','block');
		$('#left_icon').css('display','block');

		$('#wt_p'+pageNum).css('display','none');
		$('#wt_p'+(pageNum-1)).css('display','block');
		pageNum--;
		if(pageNum==1){
			$('#left_icon').css('display','none');
		}
	});

	$('#close_icon').click(function(){
		$('.walkThrough').css('display','none');
		$('#hint_icon').css('display','block');
		
		stP = 4;
	});

	$('#hint_icon').click(function(){
		$('.walkThrough').css('display','block');
		$('#hint_icon').css('display','none');
		$('#wt_p1').css('display','block');
		$('#right_icon').css('display','block');
		$('#overlay').css('display','block');
		$('#opening').css('display','none');
		$('#close_icon').css('display','block');

		pageNum = 1;
		stP = 0;
	});


});
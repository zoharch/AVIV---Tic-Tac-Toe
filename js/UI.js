var friend = 0; // 0 - AI , 1 = play agains friends
const MAX_ROWS = 3;
const MAX_COLS = 3;
const X = "img/x-png-18.png";
const O = "img/O-Jolle_insigna.png";
//*********************************************
//------------------------------------------------
// global 
//
    var winner = new Object();
// 
//------------------------

//on load Jquery :
$(function () {
	//menu definitions
	$("#idAiSelect").on("click",computer);
	$("#idFreind").on("click",display);
	//deligate click event of the div(gameCell) childes
	// to the parent container gameBoard
	$("#gameBoard").on("click",".gameCell",spotClick);
	hearts_paint();
	//paint the board game and the canvas;
	board_paint();
	creatCanvas();
	$("#canvas").hide();
	//Modal btn event listener (game over dialog)
    $("#btn2").on("click",restart);
});

function display() {
		alert("friend");
	if ($(this).attr('aria-pressed')=="true") return; 
	$(this).attr('aria-pressed',"true");
	$("#idAiSelect").attr('aria-pressed',"false");
	$("#idAiSelect").removeClass("active");
	$(this).addClass("active");
	friend = 1;
}
function computer() {
		alert("compter");
	if ($(this).attr('aria-pressed')=="true") return;
	$(this).attr('aria-pressed',"true");
	$("#idFreind").attr('aria-pressed',"false");
	$("#idFreind").removeClass("active");
	$(this).addClass("active");
	friend = 0;
}

function hearts_paint() {
	var heart;
	var h = $("#nav").height()/2;
	for (var i = 1; i <=8 ; i ++ ) {
		heart = $("<img>");
		heart
			.attr({
			"id" : "heart"	+ i ,
			'src' : "img/heart1.png"
				})
			.css('height',h);
	$("#hearts").append(heart);	
	}
}
//*********************************************
// painting board game and setting click event 
function board_paint() {
	var x,y,div;
	//using clientWidth and clientHeight for IE8 and earlier
	const OVERALL_HEIGHT = window.innerHeight || 
		  document.documentElement.clientHeight ||
		  document.body.clientHeight;
	const NAV_HEIGHT = $("#nav").height();
	var gamcellHeight =(OVERALL_HEIGHT-NAV_HEIGHT)/MAX_ROWS;
	// loop:
	for (y = 1; y <= MAX_ROWS; y++) {
		for (x = 1; x <= MAX_COLS; x++) {
			div = $("<div>");
			div.addClass('gameCell bg-primary col-4 spot');
			div.css({
				'height': gamcellHeight,
				'display': 'flex',
				'align-items': 'center',
				'justify-content': 'center'
			});
			div.attr('id',y+'-'+x);
			div.attr('value',0);
			$("#gameBoard").append(div);
		}
		$("#1-1").addClass('border border-top-0 border-left-0');
		$("#1-2").addClass('border border-top-0');
		$("#1-3").addClass('border border-top-0 border-right-0');
		$("#2-1").addClass('border border-left-0');
		$("#2-2").addClass('border');
		$("#2-3").addClass('border border-right-0');
		$("#3-1").addClass('border border-bottom-0 border-left-0');
		$("#3-2").addClass('border border-bottom-0');
		$("#3-3").addClass('border border-bottom-0 border-right-0');
	}
}

function printSymbol(_this) {
	
	var symbol = (player > 0) ? X : O ;
	var val,img,h,w;
	switch (player) {
		case 1:
			val = 'H';
			break;
		case -1:
			val = 'A';
			break;
		case 2:
			val = 'H tmp';
			$(_this).addClass('AI-Hguess');
			break;
		case -2:
			val = "A tmp";
			$(_this).addClass('AIguess');
			break;
		default:
			console.log("unavailable player"+player);
	}
	$(_this).attr('value',val).removeClass('spot');
	// player A/H tmp are the middle process of AI calculating it's best move.
	// therefore the img is not showed on the board.
	if (Math.abs(player) == 1) {
		img = $("<img>");
		img.attr("src",symbol);
		h = $(_this).height();
		w = $(_this).width();
		if (h<w) {
			img.css("height",h+"px");
		} else {
			img.css("width",w+"px");	
		}	
		$(_this).append(img);	
	}
}

// clear the bord from AI guses
function clearAIgueses(gameCell) {
	$(gameCell).attr('value',0);
	$(gameCell).addClass('spot').removeClass('AIguess');
}

// clear the bord from AI guses
function clearAI_Hgueses(gameCell) {
	$(gameCell).attr('value',0);
	$(gameCell).addClass('spot').removeClass('AI-Hguess');
}

function restart() {
	console.log("restart");
	gameTerminal = "Didn't Start";
	player = 1;
	winner.bwin = false;
    $('#GameModal').modal('hide');
    $('#gameBoard').empty();
	$("#canvas").hide();
	canvasClear();
    board_paint() ;
}
function showGameModal () {
	console.log("showGameModal");
	var str;
	//states of the game are:
	//"Didn't Start" ; 'AI win' ; 'Human win'; 'The Game is Draw'; 
	switch(gameTerminal) {
		case 'Human win':
			str = 'כל הכבוד !!  ניצחת ! רוצה לשחק שוב ??';
			break;
		case 'AI win':
			str = 'אני ניצחתי. רוצה לשחק שוב? אני בטוח שאתה יכול יותר.';
			break;
		case 'The Game is Draw':
			str = 'תקו.  רוצה לשחק שוב ?.';
			break;			
		default:
			console.log ('showGameModal Called when the state of the game was: ' + gameTerminal );
		   }
    $("#msg").html(str);
    $('#GameModal').modal('show');
}


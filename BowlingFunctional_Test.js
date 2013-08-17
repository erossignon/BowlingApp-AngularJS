describe("testing BowlingGame HTML page",function(){
	 
	beforeEach(function() {
		
		// browser().reload();
     	browser().navigateTo('Bowling.html');
     	// add player 1
     
     	input('Name').enter('Player1');
     	element('#add_user_btn',"Add Player Button").click();

     	input('Name').enter('Player2');
     	element('#add_user_btn',"Add Player Button").click();	

    });
	it("should update score when user plays",function(){

		input('pin').enter('4');	
		element('#play-btn:button',"Play Button").click();
		expect(element('div#scorePlayer1').text()).toBe("4");

		input('pin').enter('6');
		element('#play-btn:button',"Play Button").click();
		expect(element('div#scorePlayer1').text()).toBe("10");

		input('pin').enter('2');
		element('#play-btn:button',"Play Button").click();
		expect(element('div#scorePlayer2').text()).toBe("2");

	});
	afterEach(function(){
		// alert("done");
	});
});

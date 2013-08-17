describe('Bowling controllers', function() {
 
  describe('BowlingCtrl', function(){
 
    it('should create "players" model with 0 players', function() {
      var scope = {},
      ctrl = new BowlingCtrl(scope);
      expect(scope.game.players.length).toBe(0);
    });
    it('should add "players" ', function() {
      var scope = {},
      ctrl = new BowlingCtrl(scope);

      scope.game.addPlayer("Matthieu");
      expect(scope.game.players.length).toBe(1);
      
      scope.game.addPlayer("Papa");
      expect(scope.game.players.length).toBe(2);

    });

  });
});

describe("Players",function(){
	it("should have a score of zero if ball has gone in the gutter each time",function(){

		var i;
		var player  = new Player("foo");
		for (i =0;i<20;i++) {
			player.roll(0);
		}
		expect(player.score()).toBe(0);
		expect(player.round).toBe(20);

	});
	it("should have a score of 20 if one pin has been hit each roll",function(){

		var player  = new Player("foo");
		expect(player.name).toBe("foo");
		for (var i =0;i<20;i++) {
			player.roll(1);
		}
		expect(player.score()).toBe(20);

	});
	it("should have a score of 20 if a spare then 3 and 4 then nothing",function(){

		var player  = new Player("foo");
		expect(player.name).toBe("foo");
		player.roll(5);
		player.roll(5);
		player.roll(3);
		player.roll(4);
		
		expect(player.frameIsStrike(0)).toBe(false);
		expect(player.frameIsSpare(0)).toBe(true);

		expect(player.frameIsStrike(1)).toBe(false);
		expect(player.frameIsSpare(1)).toBe(false);

		for (var i =0;i<16;i++) {
			player.roll(0);
		}
		expect(player.score()).toBe(20);

	});		

	it("should have a score of 20 if a strike then 3 and 4 then nothing",function(){

		var player  = new Player("foo");
		expect(player.name).toBe("foo");

		player.roll(10);
		// no roll (due to strike)
		expect(player.frameIsStrike(0)).toBe(true);
		expect(player.frameScore(0)).toBe(10);

		player.roll(3);
		player.roll(4);
		
		expect(player.frameIsNormal(1)).toBe(true);

		expect(player.frameScore(1)).toBe(7);
		expect(player.frameScore(0)).toBe(17);

		expect(player.frameIsStrike(1)).toBe(false);
		expect(player.frameIsStrike(1)).toBe(false);

		for (var i =0;i<14;i++) {
			player.roll(0);
		}
		expect(player.score()).toBe(10+3+4+4+3);
		player.roll(6);
		player.roll(4);

		expect(player.score()).toBe(10+3+4+4+3+10);
		var s = player.scoreString();

		player.reset();
		expect(player.round ).toBe( 0 );

	});		
	it("should have a score of 300 with only strikes",function(){

		var player  = new Player("foo");
		for (var i =0;i<9;i++) {
			expect(player.currentFrame()).toBe(i);
			player.roll(10);
		}
		// now play last frame
        expect(player.currentFrame()).toBe(9);
        expect(player.currentChance()).toBe(0);
		player.roll(10);
        expect(player.currentFrame()).toBe(9);
        expect(player.currentChance()).toBe(1);
		player.roll(10);
        expect(player.currentFrame()).toBe(9);
        expect(player.currentChance()).toBe(2);
		player.roll(10);

		expect(player.frameIsStrike(0)).toBe(true);
		expect(player.frameIsStrike(1)).toBe(true);
		expect(player.frameIsStrike(2)).toBe(true);
		expect(player.frameIsStrike(3)).toBe(true);
		expect(player.frameIsStrike(4)).toBe(true);
		expect(player.frameIsStrike(5)).toBe(true);
		expect(player.frameIsStrike(6)).toBe(true);
		expect(player.frameIsStrike(7)).toBe(true);
		expect(player.frameIsStrike(8)).toBe(true);
		expect(player.frameIsStrike(9)).toBe(true);
		expect(player.frameIsStrike(10)).toBe(true);

		expect(player.score()).toBe(300);

		expect(player.frameScore(0)).toBe(30);
		expect(player.frameScore(1)).toBe(30);
		expect(player.frameScore(2)).toBe(30);
		expect(player.frameScore(3)).toBe(30);
		expect(player.frameScore(4)).toBe(30);
		expect(player.frameScore(5)).toBe(30);
		expect(player.frameScore(6)).toBe(30);
		expect(player.frameScore(7)).toBe(30);
		expect(player.frameScore(8)).toBe(30);
		expect(player.frameScore(9)).toBe(30);

	});

	it("should update the standing pin correctly ",function(){
		
		var player  = new Player("foo");

		// cannot knot up pin
		expect(function() { player.roll(-1); }).toThrow("Invalid number of pin");
		expect(function() { player.roll(12); }).toThrow("Invalid number of pin");

		expect(player.standingPin()).toBe(10);
		expect(player.currentFrame()).toBe(0);
		expect(player.currentChance()).toBe(0);

		player.roll(3);
		expect(player.standingPin()).toBe(7);
		expect(player.currentFrame()).toBe(0);
		expect(player.currentChance()).toBe(1);

		// cannot knot down more  pin than available
		expect(function() { player.roll(8); }).toThrow();

		player.roll(3);
		expect(player.standingPin()).toBe(10);
		expect(player.currentFrame()).toBe(1);
		expect(player.currentChance()).toBe(0);


		// now a strike
		player.roll(10);
		expect(player.standingPin()).toBe(10);
		expect(player.currentFrame()).toBe(2);
		expect(player.currentChance()).toBe(0);

	});
	it("should allow to play 3 times if spare at last round",function(){
		var player  = new Player("foo");
		
		for (var i =0;i<9;i++) {
			expect(player.numberOfChanceInCurrentFrame()).toBe(2);
			expect(player.currentFrame()).toBe(i);
			player.roll(0);
			player.roll(0);
			expect(player.frameScore(i)).toBe(0);
			expect(player.gameIsOver()).toBe(false);
		}
		expect(player.currentFrame()).toBe(9);
		expect(player.numberOfChanceInCurrentFrame()).toBe(3);
		expect(player.round).toBe(18);


		player.roll(10);
		expect(player.standingPin()).toBe(10);
		expect(player.frameScore(9)).toBe(10);
		expect(player.round).toBe(19);
		expect(player.gameIsOver()).toBe(false);
		
		player.roll(10);		
		expect(player.standingPin()).toBe(10);
		expect(player.gameIsOver()).toBe(false);
		expect(player.frameScore(9)).toBe(20);
		expect(player.standingPin()).toBe(10);
		expect(player.round).toBe(20);
		expect(player.gameIsOver()).toBe(false);
		
		player.roll(10);		
		expect(player.round).toBe(21);
		expect(player.frameScore(9)).toBe(30);
		expect(player.gameIsOver()).toBe(true);
		expect(player.standingPin()).toBe(0);

		expect(function(){ player.roll(1); }).toThrow();

	});	

	describe("test random games",function(){
		it("should have the correct result for BAR",function(){
			
			var player  = new Player("BAR");
			
			[ 0,0 , 5,0, 6,2, 3,3, 6,4, 9,0, 5,3, 8,1, 1,0, 9,0].forEach(function(p) {
				player.roll(p);
			});
			expect(player.score()).toBe(74);
		});
		it("should have the correct result for TIFF",function(){
			var player  = new Player("TIFF");
			
			[ 0,0, 0,0, 0,9, 0,9, 0,0, 3,6, 0,9, 0,9, 6,3, 0,3].forEach(function(p) {
				player.roll(p);
			});
			expect(player.score()).toBe(57);

		});		

		it("should have the correct result for FELI",function(){
			
			var player  = new Player("FELI");
			
			[ 0,8, 0,7, 8,0, 8,0, 0,6, 3,3, 3,5, 1,0, 3,4, 7,1 ].forEach(function(p) {
				player.roll(p);
			});
			expect(player.score()).toBe(67);
		});		
		it("should have the correct result for H",function(){
			
			var player  = new Player("H");
			
			[ 0,0, 5,5, 3,5, 9,0, 5,0, 0,2, 7,3 , 7,3, 2,8, 5,2 ].forEach(function(p) {
				player.roll(p);
			});
			expect(player.score()).toBe(88);
		});		

		it("should have the correct result for G",function(){
			
			var player  = new Player("G");
			
			[ 0,0, 0,0, 3,0, 10, 0,0, 10, 8,0, 6,0, 3,7 , 0,3 ].forEach(function(p) {
				player.roll(p);
			});
			expect(player.gameIsOver()).toBe(true);
			expect(player.score()).toBe(58);
		});				
 
		it("should have the correct result for WORE",function(){
		
			var player  = new Player("WORE");
			
			[ 8,2, 9,0, 7,1, 5,1, 10, 10, 10, 7,3, 9,0 , 10,7,1 ].forEach(function(p) {
				player.roll(p);
			});
			expect(player.gameIsOver()).toBe(true);
			expect(player.score()).toBe(165);
		});		
		it("should have the correct result for LOBO",function(){
		
			var player  = new Player("LOBO");
			
			[ 8,0, 8,2, 7,3, 7,3, 10, 7,3, 6,0, 7,1, 9,0 , 4,0 ].forEach(function(p) {
				player.roll(p);
			});
			expect(player.gameIsOver()).toBe(true);
			expect(player.score()).toBe(125);
		});				
	});
});
describe("verifying people turns",function(){
	it("should let player 1 play twice before letting player 2 play",function() {

		var game = new Game();
		game.addPlayer("Player 1");
		game.addPlayer("Player 2");

		expect(game.currentPlayer().name).toBe("Player 1");

		game.roll(1);
		expect(game.currentPlayer().name).toBe("Player 1");

		game.roll(1);
		expect(game.currentPlayer().name).toBe("Player 2");

		game.roll(1);
		expect(game.currentPlayer().name).toBe("Player 2");

		game.roll(1);
		expect(game.currentPlayer().name).toBe("Player 1");


		game.reset();

	});
});

describe("finding players ",function(){
	var game;
	beforeEach(function(){
		game = new Game();
		game.addPlayer("p1");
		game.addPlayer("p2");
		game.addPlayer("p3");
		game.addPlayer("p4");
	});
	it("should not be possible to add two players with the same name",function(){
		expect(function(){ game.addPlayer("p4");}).toThrow();
	});
	it("should find players",function(){
		expect(game.findPlayer("p1")).toBeDefined();
		expect(game.findPlayer("Hollow Man")).not.toBeDefined();
		expect(game.findPlayer("p2")).toBeDefined();
		expect(game.findPlayer("p3")).toBeDefined();
	});
});
describe("detecting game status",function(){
	it("should indicate 'new' when game hasn't started yet",function() {
		var game = new Game();
		expect(game.status()).toBe("new");
		
		game.addPlayer("Player 1");
		expect(game.status()).toBe("ready");

		game.roll(1);
		expect(game.status()).toBe("in progress");

		for (var i=0;i<19;i++) game.roll(1);

		expect(game.status()).toBe("completed");
	})
});


Feature: Bowling application
  In order to calculate players score during a bowling game
  As a bowling player
  I need to be able to record the number of knocked down pin.


  Scenario: Starting the application
    When I start the application
    Then the application shall propose to configure a new game.


  Scenario:  Starting a new game
             The application shall first allow the game master to configure
             the list of players.
    Given that the application is in new game mode
    When the game master enter 'Joe' as name of a player
    When the game master press OK
    Then a new score board should be visible

  Scenario: First roll
    Given a new game has been created
    When the player has knocked down 3 pins
    Then the score in frame n°1 should be 3
    And  the total score should be 3

  Scenario: First frame
    Given a new game has been created
    When the player has knocked down 3 pins and 5 pins
    Then the score in frame n°1 should be 8
    And  the total score should be 8


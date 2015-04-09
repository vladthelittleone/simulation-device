#pragma strict

/// <summary>
/// Title screen script
/// </summary>

function OnGUI()
{
	var buttonWidth : int = 84;
	var buttonHeight : int = 60;

	// Determine the button's place on screen
	// Center in X, 2/3 of the height in Y
	var buttonRect : Rect = Rect(
	      Screen.width / 2 - (buttonWidth / 2),
	      (2 * Screen.height / 3) - (buttonHeight / 2),
	      buttonWidth,
	      buttonHeight
	    );

	// Draw a button to start the game
	if(GUI.Button(buttonRect,"Start!"))
	{
	  // On Click, load the first level.
	  // "Stage1" is the name of the first scene we created.
	  Application.LoadLevel("GameScene");
	}
}

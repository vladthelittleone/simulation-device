#pragma strict

/// <summary>
/// Title screen script
/// </summary>

private var skin : GUISkin;

function Start()
{
	// Load a skin for the buttons
	skin = Resources.Load("GUISkin") as GUISkin;
}

function OnGUI()
{
	var buttonWidth : int = 128;
	var buttonHeight : int = 60;

	// Set the skin to use
	GUI.skin = skin;

	// Draw a button to start the game
	if (GUI.Button(
	  // Center in X, 2/3 of the height in Y
	  new Rect(Screen.width / 2 - (buttonWidth / 2), 
	  (2 * Screen.height / 3) - (buttonHeight / 2), 
	  buttonWidth, buttonHeight),
	  "START"
	  ))
	{
	  // On Click, load the first level.
	  Application.LoadLevel("GameScene"); // "Stage1" is the scene name
	}
}
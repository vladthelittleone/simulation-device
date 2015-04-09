#pragma strict

/// <summary>
/// Start or quit the game
/// </summary>
function OnGUI()
{
	var buttonWidth : int = 120;
	var buttonHeight : int = 60;

	if (
	  GUI.Button(
	    // Center in X, 1/3 of the height in Y
	    Rect(
	      Screen.width / 2 - (buttonWidth / 2),
	      (1 * Screen.height / 3) - (buttonHeight / 2),
	      buttonWidth,
	      buttonHeight
	    ),
	    "Retry!"
	  )
	)
	{
	  // Reload the level
	  Application.LoadLevel("GameScene");
	}

	if (
	  GUI.Button(
	    // Center in X, 2/3 of the height in Y
	    Rect(
	      Screen.width / 2 - (buttonWidth / 2),
	      (2 * Screen.height / 3) - (buttonHeight / 2),
	      buttonWidth,
	      buttonHeight
	    ),
	    "Back to menu"
	  )
	)
	{
	  // Reload the level
	  Application.LoadLevel("Menu");
	}
}

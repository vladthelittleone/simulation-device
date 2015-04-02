#pragma strict

/// <summary>
/// Enemy generic behavior
/// </summary>

private var weapons : WeaponScript[];

private var hasSpawn : boolean;

private var moveScript : MoveScript;

function Awake()
{
	// Retrieve the weapon only once
    weapons = GetComponentsInChildren.<WeaponScript>();
    
    // Retrieve scripts to disable when not spawn
    moveScript = GetComponent(MoveScript);
}

// 1 - Disable everything
function Start()
{
	hasSpawn = false;

	// Disable everything
	// -- collider
	GetComponent.<Collider2D>().enabled = false;
	
	// -- Moving
	moveScript.enabled = false;
	
	// -- Shooting
	for (var weapon : WeaponScript in weapons)
	{
	  weapon.enabled = false;
	}
}
  
function Update()
{
   
    // 2 - Check if the enemy has spawned.
    if (hasSpawn == false)
    {
      if (RendererHelpers.IsRenderedFrom(GetComponent.<Renderer>(), Camera.main))
      {
        Spawn();
      }
    }
    else
    {
      // Auto-fire
      for (var weapon : WeaponScript in weapons)
      {
        if (weapon != null && weapon.enabled && weapon.CanAttack)
        {
          weapon.Attack(true);
        }
      }

      // 4 - Out of the camera ? Destroy the game object.
      if (RendererHelpers.IsRenderedFrom(GetComponent.<Renderer>(), Camera.main) == false)
      {
        Destroy(gameObject);
      }
    }
}

 // 3 - Activate itself.
function Spawn()
{
	hasSpawn = true;

	// Enable everything
	// -- Collider
	GetComponent.<Collider2D>().enabled = true;
	
	// -- Moving
	moveScript.enabled = true;
	
	// -- Shooting
    for (var weapon : WeaponScript in weapons)
	{
	  weapon.enabled = true;
	}
}

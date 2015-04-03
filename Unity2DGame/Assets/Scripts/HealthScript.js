#pragma strict

/// <summary>
/// Handle hitpoints and damages
/// </summary>

/// <summary>
/// Total hitpoints
/// </summary>
public var hp : int = 1;

/// <summary>
/// Enemy or player?
/// </summary>
public var isEnemy : boolean = true;

/// <summary>
/// Inflicts damage and check if the object should be destroyed
/// </summary>
/// <param name="damageCount"></param>
function Damage (damageCount : int) 
{
	hp -= damageCount;

	if (hp <= 0) 
	{
      // 'Splosion!
      SpecialEffectsHelper.Instance.Explosion(transform.position);
      
	  // Dead!
	  Destroy(gameObject);
	}
}

function OnTriggerEnter2D (otherCollider : Collider2D) 
{
	// Is this a shot?
	var shot : ShotScript = otherCollider.gameObject.GetComponent(ShotScript);
		
	if (shot != null) 
	{
	  // Avoid friendly fire
	  if (shot.isEnemyShot != isEnemy) 
	  {
	    Damage(shot.damage);
	    
	    // Destroy the shot
	    Destroy(shot.gameObject); // Remember to always target the game object, otherwise you will just remove the script
	  }
	}
}
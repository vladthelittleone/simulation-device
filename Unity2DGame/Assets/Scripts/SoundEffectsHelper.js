#pragma strict

/// <summary>
/// Creating instance of sounds from code with no effort
/// </summary>
public class SoundEffectsHelper extends MonoBehaviour
{

  /// <summary>
  /// Singleton
  /// </summary>
  public static var Instance : SoundEffectsHelper;

  public var explosionSound : AudioClip;
  public var playerShotSound : AudioClip;
  public var enemyShotSound : AudioClip;

  function Awake()
  {
    // Register the singleton
    if (Instance != null)
    {
      Debug.LogError("Multiple instances of SoundEffectsHelper!");
    }
    Instance = this;
  }

  public function MakeExplosionSound()
  {
    MakeSound(explosionSound);
  }

  public function MakePlayerShotSound()
  {
    MakeSound(playerShotSound);
  }

  public function MakeEnemyShotSound()
  {
    MakeSound(enemyShotSound);
  }

  /// <summary>
  /// Play a given sound
  /// </summary>
  /// <param name="originalClip"></param>
  private function MakeSound(originalClip : AudioClip)
  {
    // As it is not 3D audio clip, position doesn't matter.
    AudioSource.PlayClipAtPoint(originalClip, transform.position);
  }
}
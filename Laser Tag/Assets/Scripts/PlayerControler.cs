//local API, has classes and objects and stuff
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using TMPro;

public class PlayerController : MonoBehaviour
{

    //statement of intent to build a rigidbody
    private Rigidbody rb;
    public float speed = 0;
    private float movementX;
    private float movementY;
    public int points = 0;
    private Vector3 originalPosition;
    private float JumpyJumpy = 25;
    // Start is called before the first frame update
    //acts like constuctor
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        originalPosition = new Vector3(gameObject.transform.position.x, gameObject.transform.position.y, gameObject.transform.position.z);
    }
    void Restart()
    {
        if (Input.GetKeyDown(KeyCode.P))
        {
            gameObject.transform.position = originalPosition;

        }
    }
    void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Cube")
        {
            AddPoints(1);
        }
    }



    private void OnMove(InputValue momentValue)
    {
        //vector for storing movement values
        Vector2 momentVector = momentValue.Get<Vector2>();
        movementX = momentVector.x;
        movementY = momentVector.y;
    }
    public void AddPoints(int n)
    {
        points += n;
    }
    public void Jump()
    {
        if (Input.GetKeyDown(KeyCode.Space) && gameObject.transform.position.y <= 0.5)
        {

            rb.AddForce(Vector3.up * JumpyJumpy, ForceMode.Impulse);

        }
    }
    public void unVoid()
    {
        if (Input.GetKeyDown(KeyCode.O))
        {

            gameObject.transform.position = originalPosition;

        }
    }
    private void Reset()
    {
        if (Input.GetKeyDown(KeyCode.T))
        {
            gameObject.transform.position = originalPosition;
        }
    }
    // Update is called once per frame
    void Update()
    {
        Jump();
        Restart();
        Reset();
        unVoid();
    }
    //FixedUpdate called once per frame
    //Deals with physics
    void FixedUpdate()
    {
        Vector3 movement = new Vector3(movementX, 0.0f, movementY);
        rb.AddForce(movement * speed);
    }
}

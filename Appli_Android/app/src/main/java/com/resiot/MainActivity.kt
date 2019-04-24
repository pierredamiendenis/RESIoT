package com.resiot

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.widget.Button
import com.android.volley.toolbox.Volley
import okhttp3.Request
import okhttp3.Response
import org.json.JSONObject


class MainActivity : AppCompatActivity() {

    val url = "http://10.0.2.2:8080"


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)



        var btnStartStop = findViewById<Button>(R.id.button1)

        var jsonobj = JSONObject()

        btnStartStop.setOnClickListener{


            Log.d("*****","Appuie sur bouton start")

            jsonobj.put("name","coucou")

            val que = Volley.newRequestQueue(this@MainActivity)
            val req = JSONObjectRequest(Request.Method.GET,url,null
            Response.Listener{
                response ->
                toast(response["success"].toString())

            },Response.ErrorListener{
                toast("Erreur")

            })



            //val requestQueue = Volley.newRequestQueue(MainActivity.this)
           /*val requestQueue = Volley.newRequestQueue(this)
           val stringReq = StringRequest(Request.Method.POST,url,

               Response.Listener<String> { response ->

                   // Ca marche
                   requestQueue.stop()
               },
               Response.ErrorListener { textView!!.text = "That didn't work!"
               requestQueue.stop()
               })
            queue.add(stringReq)*/




            /*val okHttpClient = OkHttpClient()
            val myGetRequest = Request.Builder()
                .url("http://10.0.2.2:8080")
                .build()*/


            /*val client = OkHttpClient()

            val formBody = FormBody.Builder()
                .add("message", "Your message")
                .build()
            val request = Request.Builder()
                .url("http://10.0.2.2:8080")
                .post(formBody)
                .build()

            try {
                val response = client.newCall(request).execute()
                Log.d("reponse!!!" , response.toString())

                // Do something with the response.
            } catch (e: IOException) {
                e.printStackTrace()
            }*/

        }


        var btnConnect = findViewById<Button>(R.id.buttonConnect)


    }
}

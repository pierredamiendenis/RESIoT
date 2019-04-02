package com.resiot

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import org.json.JSONException
import org.json.JSONObject
import java.io.IOException
import android.os.AsyncTask.execute
import okhttp3.*


class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)



        var btnStartStop = findViewById<Button>(R.id.button1)
        btnStartStop.setOnClickListener(){

            val client = OkHttpClient()

            val formBody = FormBody.Builder()
                .add("message", "Your message")
                .build()
            val request = Request.Builder()
                .url("http://localhost:8080")
                .post(formBody)
                .build()

            try {
                val response = client.newCall(request).execute()

                // Do something with the response.
            } catch (e: IOException) {
                e.printStackTrace()
            }

        }

        var btnConnect = findViewById<Button>(R.id.buttonConnect)

        btnConnect.setOnClickListener{
            
        }



    }
}

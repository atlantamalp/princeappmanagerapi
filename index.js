const sb = require('@supabase/supabase-js');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

// Create a single supabase client for interacting with your database
const supabase = sb.createClient('https://jpxjedklgtsprhreoblm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpweGplZGtsZ3RzcHJocmVvYmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU1NDI5OTAsImV4cCI6MTk2MTExODk5MH0.HvRQVZurU2Xl2NdrDtiarcVjsQGlCepa9Nzwnqpvu1U')

app.get('/', (req, res) => res.send('App Manager'))

app.get('/app', async (req, res) => {
    const appId = req.query.package;
    if (appId == null) {
        res.json({ data: null, messge: "app package required" })
    } else {
        try {
            const appInfo = await supabase
                .from("all_apps")
                .select()
                .eq("app_package", appId).single()
            
                appInfo.data != null ?   res.json({ data: appInfo.data }) :   res.json({ data: appInfo.data, message : "no data" });
        } catch {
            res.json({ data: null, messge: "error" })
        }
    }
})

app.listen(port, () => console.log(`App manager running on port ${port}`))

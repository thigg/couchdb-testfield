const nano = require('nano');


const alphaurl = 'http://admin:password@10.0.0.10:5984';
const alpha = nano(alphaurl);
const betaurl = 'http://admin:password@10.0.0.11:5984';
const beta = nano(betaurl);


async function asyncCall() {
    const dbname = 'testdb';
    await alpha.db.destroy(dbname);
    await beta.db.destroy(dbname);
    await alpha.db.create(dbname);
    await beta.db.create(dbname);
    try {
        await alpha.db.destroy("_replicator")
    } catch (e) {

    }
    await alpha.db.create("_replicator");
    console.log("db setup done");
    const dbalpha = alpha.db.use(dbname);
    const dbbeta = beta.db.use(dbname);
    const response = await dbalpha.insert({status: 'green'}, 'banana');
    console.log("Created doc: " + response['id'] + " rev: " + response['rev'] + ". Replicating now!");
    const replurl = betaurl + "/" + dbname;
    console.log("Replicating from '" + dbname + "' to: '" + replurl)
    const repli = await alpha.db.replication.enable(dbname, replurl,
        {_id: "replbanana", create_target: true})
    console.log("Replication: " + repli.id);
    setTimeout(async function() {
        console.log("Replication done!")
        const responseb = await dbbeta.get('banana');
        console.log(".")
        const responsea = await dbalpha.get('banana');
        console.log("Document on b: " + responseb.status);
        responseb.status="yellow";
        responsea.status="brown";
        console.log("Inseting change into beta")
        await dbbeta.insert(responseb);
        console.log("Inseting change into alpha")
        await dbalpha.insert(responsea);
        console.log("Replicating from '" + dbname + "' to: '" + replurl)
        await alpha.db.destroy("_replicator")
        await alpha.db.create("_replicator");
        const repli = await alpha.db.replication.enable(dbname, replurl,
            {_id: "replbanana", create_target: true})

        setTimeout(async function() {
            console.log("Conflict should be caused!")
            const responseb = await dbbeta.get('banana',{meta:true});
            console.log("Rev " + responseb._rev + " is in conflict with " + responseb._conflicts)
        }, 10000);
    }, 10000);
}

asyncCall()
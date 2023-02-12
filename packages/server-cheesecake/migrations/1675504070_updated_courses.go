package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("narak07qcl3ekdk")
		if err != nil {
			return err
		}

		// add
		new_year := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "aitcgr2g",
			"name": "year",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": 2015,
				"max": null
			}
		}`), new_year)
		collection.Schema.AddField(new_year)

		// add
		new_semester := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "rzo5yz2h",
			"name": "semester",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": 1,
				"max": 2
			}
		}`), new_semester)
		collection.Schema.AddField(new_semester)

		// add
		new_isElective := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "2vnxoi7u",
			"name": "isElective",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_isElective)
		collection.Schema.AddField(new_isElective)

		// add
		new_status := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "dj0w5smg",
			"name": "status",
			"type": "select",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"Complete",
					"Incomplete"
				]
			}
		}`), new_status)
		collection.Schema.AddField(new_status)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("narak07qcl3ekdk")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("aitcgr2g")

		// remove
		collection.Schema.RemoveField("rzo5yz2h")

		// remove
		collection.Schema.RemoveField("2vnxoi7u")

		// remove
		collection.Schema.RemoveField("dj0w5smg")

		return dao.SaveCollection(collection)
	})
}

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

		// remove
		collection.Schema.RemoveField("dj0w5smg")

		// add
		new_isComplete := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "hqc2rsbk",
			"name": "isComplete",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_isComplete)
		collection.Schema.AddField(new_isComplete)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("narak07qcl3ekdk")
		if err != nil {
			return err
		}

		// add
		del_status := &schema.SchemaField{}
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
		}`), del_status)
		collection.Schema.AddField(del_status)

		// remove
		collection.Schema.RemoveField("hqc2rsbk")

		return dao.SaveCollection(collection)
	})
}

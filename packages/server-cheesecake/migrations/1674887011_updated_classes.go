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

		collection, err := dao.FindCollectionByNameOrId("zcr9igpnnm9v5s8")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("prpg4bgd")

		// add
		new_durationStart := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "lfzz9q0l",
			"name": "durationStart",
			"type": "date",
			"required": true,
			"unique": false,
			"options": {
				"min": "",
				"max": ""
			}
		}`), new_durationStart)
		collection.Schema.AddField(new_durationStart)

		// add
		new_durationEnd := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "pgouuedb",
			"name": "durationEnd",
			"type": "date",
			"required": true,
			"unique": false,
			"options": {
				"min": "",
				"max": ""
			}
		}`), new_durationEnd)
		collection.Schema.AddField(new_durationEnd)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("zcr9igpnnm9v5s8")
		if err != nil {
			return err
		}

		// add
		del_duration := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "prpg4bgd",
			"name": "duration",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_duration)
		collection.Schema.AddField(del_duration)

		// remove
		collection.Schema.RemoveField("lfzz9q0l")

		// remove
		collection.Schema.RemoveField("pgouuedb")

		return dao.SaveCollection(collection)
	})
}

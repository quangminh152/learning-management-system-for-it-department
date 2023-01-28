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

		collection, err := dao.FindCollectionByNameOrId("5w028cn3otet5we")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("hzaeblok")

		// add
		new_noteMaterial := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "8il6q9dn",
			"name": "noteMaterial",
			"type": "file",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [],
				"thumbs": []
			}
		}`), new_noteMaterial)
		collection.Schema.AddField(new_noteMaterial)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("5w028cn3otet5we")
		if err != nil {
			return err
		}

		// add
		del_noteMaterial := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "hzaeblok",
			"name": "noteMaterial",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_noteMaterial)
		collection.Schema.AddField(del_noteMaterial)

		// remove
		collection.Schema.RemoveField("8il6q9dn")

		return dao.SaveCollection(collection)
	})
}

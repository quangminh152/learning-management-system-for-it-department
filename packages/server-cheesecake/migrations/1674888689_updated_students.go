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

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("o5rgniff")

		// remove
		collection.Schema.RemoveField("d6y2tdxu")

		// add
		new_major := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "c6wibh9n",
			"name": "major",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"collectionId": "v7ga8m74krd9zct",
				"cascadeDelete": false
			}
		}`), new_major)
		collection.Schema.AddField(new_major)

		// add
		new_englishCertificate := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "w7td1lgz",
			"name": "englishCertificate",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_englishCertificate)
		collection.Schema.AddField(new_englishCertificate)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// add
		del_field := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "o5rgniff",
			"name": "field",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_field)
		collection.Schema.AddField(del_field)

		// add
		del_majorID := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "d6y2tdxu",
			"name": "majorID",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_majorID)
		collection.Schema.AddField(del_majorID)

		// remove
		collection.Schema.RemoveField("c6wibh9n")

		// remove
		collection.Schema.RemoveField("w7td1lgz")

		return dao.SaveCollection(collection)
	})
}

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

		collection, err := dao.FindCollectionByNameOrId("qoyog1xq1pd7889")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("4izk2bv2")

		// add
		new_classMaterial := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "anvj7zbz",
			"name": "classMaterial",
			"type": "file",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [],
				"thumbs": []
			}
		}`), new_classMaterial)
		collection.Schema.AddField(new_classMaterial)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("qoyog1xq1pd7889")
		if err != nil {
			return err
		}

		// add
		del_classMaterial := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "4izk2bv2",
			"name": "classMaterial",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_classMaterial)
		collection.Schema.AddField(del_classMaterial)

		// remove
		collection.Schema.RemoveField("anvj7zbz")

		return dao.SaveCollection(collection)
	})
}

package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "5w028cn3otet5we",
			"created": "2023-01-28 06:31:44.980Z",
			"updated": "2023-01-28 06:31:44.980Z",
			"name": "studentNotes",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "qpmbmiqz",
					"name": "curriculum",
					"type": "relation",
					"required": true,
					"unique": true,
					"options": {
						"maxSelect": 1,
						"collectionId": "qoyog1xq1pd7889",
						"cascadeDelete": false
					}
				},
				{
					"system": false,
					"id": "nr53hz7m",
					"name": "student",
					"type": "relation",
					"required": true,
					"unique": true,
					"options": {
						"maxSelect": 1,
						"collectionId": "_pb_users_auth_",
						"cascadeDelete": false
					}
				},
				{
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
				}
			],
			"listRule": null,
			"viewRule": null,
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("5w028cn3otet5we")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}

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
			"id": "ahqbuqhvdq2nt8n",
			"created": "2023-01-28 06:32:54.662Z",
			"updated": "2023-01-28 06:32:54.662Z",
			"name": "announcements",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "dzln2jp5",
					"name": "title",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "babkvhkm",
					"name": "content",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "2shpbalg",
					"name": "timeCreated",
					"type": "date",
					"required": true,
					"unique": false,
					"options": {
						"min": "",
						"max": ""
					}
				},
				{
					"system": false,
					"id": "d7migbyb",
					"name": "timeModified",
					"type": "date",
					"required": true,
					"unique": false,
					"options": {
						"min": "",
						"max": ""
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

		collection, err := dao.FindCollectionByNameOrId("ahqbuqhvdq2nt8n")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}

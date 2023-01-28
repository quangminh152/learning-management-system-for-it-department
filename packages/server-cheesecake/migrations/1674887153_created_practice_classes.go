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
			"id": "idigidy5s2b5f4s",
			"created": "2023-01-28 06:25:53.174Z",
			"updated": "2023-01-28 06:25:53.174Z",
			"name": "practice_classes",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "zscxu9qd",
					"name": "class",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"collectionId": "zcr9igpnnm9v5s8",
						"cascadeDelete": false
					}
				},
				{
					"system": false,
					"id": "enbfp1dw",
					"name": "startPeriod",
					"type": "number",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null
					}
				},
				{
					"system": false,
					"id": "lwqoowi2",
					"name": "numberOfPeriod",
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
					"id": "o77tevq3",
					"name": "lecturerInfo",
					"type": "json",
					"required": false,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "yiaedqou",
					"name": "room",
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
					"id": "fn2kjdob",
					"name": "duration",
					"type": "text",
					"required": true,
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

		collection, err := dao.FindCollectionByNameOrId("idigidy5s2b5f4s")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}

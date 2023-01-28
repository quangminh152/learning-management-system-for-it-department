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
			"id": "zcr9igpnnm9v5s8",
			"created": "2023-01-28 06:22:06.314Z",
			"updated": "2023-01-28 06:22:06.314Z",
			"name": "classes",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "m6yx1qqb",
					"name": "name",
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
					"id": "igzrkmfh",
					"name": "course",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"collectionId": "narak07qcl3ekdk",
						"cascadeDelete": false
					}
				},
				{
					"system": false,
					"id": "sejvjspg",
					"name": "totalSlots",
					"type": "number",
					"required": true,
					"unique": false,
					"options": {
						"min": 1,
						"max": null
					}
				},
				{
					"system": false,
					"id": "fzbsno0d",
					"name": "remainingSlots",
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
					"id": "dooesgqj",
					"name": "day",
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
					"id": "5qpsrvuz",
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
					"id": "vnfauysd",
					"name": "numberOfPeriod",
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
					"id": "k5zfavjv",
					"name": "lecturerInfo",
					"type": "json",
					"required": true,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "bdmftsjm",
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

		collection, err := dao.FindCollectionByNameOrId("zcr9igpnnm9v5s8")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}

export const dummyData = [
    {
        data: {
          id: 1,
          attributes: {
            name: "Meals on Wheels",
            cuisine_type: "American",
            web_link: "www.google.com",
            image_link: "https://i.etsystatic.com/14707052/r/il/00fc2c/1153843098/il_794xN.1153843098_9jks.jpg"
          },
          "relationships": [
              {
                type: "event",
                id: 1,
                attributes: {
                event_date: "04/29/2023",
                latitude: 39.739235,
                longitude: -104.990250,
                start_time: "12",
                end_time: "4",
                description: "This food truck is not a spoon."
                },
              }
            ]
          }
        },
        {
            data: {
              id: 2,
              attributes: {
                name: "Not a Food Truck",
                cuisine_type: "Armenian",
                web_link: "www.google.com",
                image_link: "https://i.etsystatic.com/14707052/r/il/00fc2c/1153843098/il_794xN.1153843098_9jks.jpg"
              },
              "relationships": [
                  {
                    type: "event",
                    id: 2,
                    attributes: {
                    event_date: "04/28/2023",
                    latitude: 38.833881,
                    longitude: -104.821365,
                    start_time: "12",
                    end_time: "4",
                    description: "We may have food. We may not."
                    },
                  }
                ]
              }
            },
            {
                data: {
                  id: 3,
                  attributes: {
                    name: "FBI Van Food Truck",
                    cuisine_type: "American",
                    web_link: "www.google.com",
                    image_link: "https://i.etsystatic.com/14707052/r/il/00fc2c/1153843098/il_794xN.1153843098_9jks.jpg"
                  },
                  "relationships": [
                      {
                        type: "event",
                        id: 1,
                        attributes: {
                        event_date: "04/29/2023",
                        latitude: 39.739235,
                        longitude: -104.990250,
                        start_time: "12",
                        end_time: "4",
                        description: "We're watching you."
                        },
                      }
                    ]
                  }
                },
                {
                    data: {
                      id: 4,
                      attributes: {
                        name: "Food Truck 1",
                        cuisine_type: "American",
                        web_link: "www.google.com",
                        image_link: "https://i.etsystatic.com/14707052/r/il/00fc2c/1153843098/il_794xN.1153843098_9jks.jpg"
                      },
                      "relationships": [
                          {
                            type: "event",
                            id: 3,
                            attributes: {
                            event_date: "04/29/2023",
                            latitude: 40.423313,
                            longitude: -104.709129,
                            start_time: "12",
                            end_time: "4",
                            description: "Eat everything."
                            },
                          }
                        ]
                      }
                    },
                    {
                        data: {
                          id: 5,
                          attributes: {
                            name: "Locos Tacos",
                            cuisine_type: "Mexican",
                            web_link: "www.google.com",
                            image_link: "https://i.etsystatic.com/14707052/r/il/00fc2c/1153843098/il_794xN.1153843098_9jks.jpg"
                          },
                          "relationships": [
                              {
                                type: "event",
                                id: 1,
                                attributes: {
                                event_date: "04/29/2023",
                                latitude: 39.739235,
                                longitude: -104.990250,
                                start_time: "12",
                                end_time: "4",
                                description: "This food truck is not a spoon."
                                },
                              }
                            ]
                          }
                        }
]
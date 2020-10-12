# Redux in action

## Overview

### State

The state in the application is normalized as to avoid nested data - this approach respects the immutability of Redux and doesn't require to update an entity in many different places.

The state looks as follows:

    state = [
        entities : {
            trips : {
                byId : {
                    "trip1" : {
                        id : "trip1",
                        destination : "Barcelona",
                        accommodation : ["acc1", "acc2"]
                    },
                    "trip2" : {
                        id : "trip2",
                        destination : "Barcelona",
                        accommodation : ["acc1"]
                    }
                },
                allIds : ["trip1", "trip2"]
            },
            accommodation : {
                byId : {
                    "acc1" : {
                        id : "acc1",
                        address : "Somewhere St. 50"
                    },
                    "acc2" : {
                        id : "acc1",
                        address : "Somewhere Else St. 29"
                    }
                },
                allIds : ["acc1", "acc2"]
            }
        }
    ]

Other types of entities are ommitted for simplicity but should follow the same pattern. 

**Read more:** [Normalizing State Shape](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)

## Use

### Managing Normalized Data

To do

**Read more:** [Managing Normalized Data](https://redux.js.org/recipes/structuring-reducers/updating-normalized-data)

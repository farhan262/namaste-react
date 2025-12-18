export const mockMenuData = {
  cards: [
    {},
    {},
    {
      card: {
        card: {
          info: {
            name: "The North Indian Thali",
            cuisines: ["North Indian", "Indian"],
            costForTwoMessage: "₹500 for two",
          },
        },
      },
    },
    {},
    {
      groupedCard: {
        cardGroupMap: {
          REGULAR: {
            cards: [
              {},
              {
                card: {
                  card: {
                    itemCards: [
                      {
                        card: {
                          info: {
                            id: "1",
                            name: "Paneer Butter Masala",
                            price: 25000,
                            defaultPrice: 25000,
                          },
                        },
                      },
                      {
                        card: {
                          info: {
                            id: "2",
                            name: "Dal Makhani",
                            price: 20000,
                            defaultPrice: 20000,
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    },
  ],
};

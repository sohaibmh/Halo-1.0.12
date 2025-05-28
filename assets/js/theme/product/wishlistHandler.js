async function addWishlistItems(wishlistId, productId, context) {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({
                query: `
                    mutation AddWishlistItems($addWishlistItemsInput: AddWishlistItemsInput!) {
                        wishlist {
                            addWishlistItems(input: $addWishlistItemsInput) {
                                result {
                                    entityId
                                    name
                                    isPublic
                                    token
                                    items {
                                        edges {
                                            node {
                                                entityId
                                                productEntityId
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `,
                variables: {
                    addWishlistItemsInput: {
                        entityId: wishlistId,
                        items: {
                            productEntityId: productId
                        }
                    }
                }
            })
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error adding item (${error})`);
        throw error;
    }
}

async function deleteWishlistItems(wishlistId, productId, context) {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({
                query: `
                    mutation deleteWishlistItems($deleteWishlistItemsInput: DeleteWishlistItemsInput!) {
                        wishlist {
                            deleteWishlistItems(input: $deleteWishlistItemsInput) {
                                result {
                                    entityId
                                    name
                                    isPublic
                                    token
                                    items {
                                        edges {
                                            node {
                                                entityId
                                                productEntityId
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `,
                variables: {
                    deleteWishlistItemsInput: {
                        entityId: wishlistId,
                        itemEntityIds: [productId]
                    }
                }
            })
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error adding item (${error})`);
        throw error;
    }
}

export { addWishlistItems, deleteWishlistItems }


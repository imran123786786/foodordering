import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url"; 

export const client = sanityClient({
    projectId: "tzcbx44q",
    dataset: 'production',
    apiVersion: "2023-10-19",
    useCdn: true,
    token: "skbUDtmFKTWX3zg82kxWmy6iqthWz9qiISDIaSHvD4RfTNflnNqHBVIBBvEDgEe7tLwVvXLKR2857XyyxNFSIfk5QGosRmAGxccTaLEfNl4CqvUsm0wkoi8eF6vG7wriJFfWJd30tISXmvC74NMI3BN2QLu8JrfuTKJWC3b7QT6qrglguyX0"
});

const builder = ImageUrlBuilder(client); 
export const urlFor = (source) => builder.image(source);

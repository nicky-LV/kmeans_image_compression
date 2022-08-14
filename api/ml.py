import numpy as np
from sklearn.cluster import KMeans
from skimage import io


def k_means(filename: str):
    # Load image
    io.imsave()
    image = io.imread(f'./input_images/{filename}')
    rows, cols = image.shape[0], image.shape[1]

    # Flatten the image, represent it as 3-arrays of [R, G, B]
    image = np.array(image.reshape(rows * cols, 3))

    km = KMeans(n_clusters=int(input("Number of colours (value of k):")))
    labels = km.fit_predict(image)
    centroids = km.cluster_centers_

    for i in range(len(labels)):
        # pixel in image = image[i]
        new_colour = centroids[labels[i]]

        # Assign one of the k colours to the pixel
        image[i] = new_colour

    # Unflatten the image back to its original shape, and transform the ith pixel to the ith label.
    image = image.reshape(rows, cols, 3)
    print(image.shape)

    # Save image to output
    io.imsave("./output_images/koala.jpeg", image)

    # todo: there are a lot of repeated values in the image array, so use an algorithm like run length encoding to reduce the size!
    # todo: do the same thing but with a kmeans algorithm from scratch

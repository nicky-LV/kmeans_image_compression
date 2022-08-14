import os.path

import numpy as np
from sklearn.cluster import KMeans
from skimage import io


def k_means(filename: str, k: int):
    """
    Runs k-means algorithm on an image, converting it into k colours and saving it in the output_images dir.
    :param filename: str - filename in input_images dir
    :param k: int - value of k (num of colours)
    :return: dict - {
    filename: str,
    height: int,
    width: int,
    size: int (bytes)
    }
    """
    # Load image
    image = io.imread(f'./input_images/{filename}')
    rows, cols = image.shape[0], image.shape[1]

    # Flatten the image, represent it as 3-arrays of [R, G, B]
    image = np.array(image.reshape(rows * cols, 3))

    km = KMeans(n_clusters=k)
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
    io.imsave(f"./output_images/{filename}", image)

    # todo: there are a lot of repeated values in the image array, so use an algorithm like run length encoding to reduce the size!
    # todo: do the same thing but with a kmeans algorithm from scratch

    return {
        "filename": filename,
        "height": rows,
        "width": cols,
        "size": os.path.getsize(f"./output_images/{filename}")
    }

def save_image(image: bytes, filename):
    with open(f"./input_images/{filename}", 'wb+') as f:
        f.write(image)

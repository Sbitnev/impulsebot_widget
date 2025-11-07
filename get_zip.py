import shutil

# Указываешь, что и как архивировать:
folder_to_zip = "widget"  # папка, которую нужно заархивировать
output_zip = "widget"  # имя архива (без .zip)

# Создаёт архив archive_name.zip в текущей директории
shutil.make_archive(output_zip, "zip", folder_to_zip)

print(f"Архив создан: {output_zip}.zip")

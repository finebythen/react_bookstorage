# Generated by Django 4.0.4 on 2022-05-18 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_book_book_index-author-title_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='published',
            field=models.DateField(default='2022-01-01'),
            preserve_default=False,
        ),
    ]
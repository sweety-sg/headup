# Generated by Django 3.2.7 on 2021-10-06 14:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('headup', '0010_alter_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='cards',
            name='status',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='lists',
            name='status',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='cards',
            name='list',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='list', to='headup.lists'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='card',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='card', to='headup.cards'),
        ),
    ]
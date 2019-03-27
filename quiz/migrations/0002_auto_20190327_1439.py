# Generated by Django 2.1.7 on 2019-03-27 06:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChoiceWeight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.IntegerField()),
                ('choice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='weights', to='quiz.Choice')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.Product')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='response',
            unique_together={('quiz_attempt', 'question')},
        ),
        migrations.AlterUniqueTogether(
            name='choiceweight',
            unique_together={('choice', 'product')},
        ),
    ]

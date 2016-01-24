# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AskFriendLink',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user1', models.ForeignKey(related_name='user1isAsking', to=settings.AUTH_USER_MODEL)),
                ('user2', models.ForeignKey(related_name='user2isAsked', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.CharField(max_length=200)),
                ('date', models.DateTimeField(verbose_name='date published')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FeatureLink',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('feature', models.CharField(max_length=50)),
                ('voted', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FeatureLinkVote',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('vote', models.IntegerField(default=0)),
                ('featureLink', models.ForeignKey(related_name='featurevote', to='profile_page.FeatureLink')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FriendLink',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user1', models.ForeignKey(related_name='user1', to=settings.AUTH_USER_MODEL)),
                ('user2', models.ForeignKey(related_name='user2', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.CharField(max_length=255)),
                ('date', models.DateTimeField(auto_now=True)),
                ('isRead', models.BooleanField(default=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=200)),
                ('content', models.CharField(max_length=1000)),
                ('date', models.DateTimeField(verbose_name='date published')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Profil',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('photo', models.ImageField(default='photos/default.png', upload_to='photos')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='post',
            name='user',
            field=models.ForeignKey(to='profile_page.Profil'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='messages',
            name='receiver',
            field=models.ForeignKey(related_name='message_receiver', to='profile_page.Profil'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='messages',
            name='sender',
            field=models.ForeignKey(related_name='message_sender', to='profile_page.Profil'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='featurelinkvote',
            name='voter',
            field=models.ForeignKey(related_name='voter', to='profile_page.Profil'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='featurelink',
            name='owner',
            field=models.ForeignKey(related_name='owner', to='profile_page.Profil'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='featurelink',
            name='sender',
            field=models.ForeignKey(related_name='sender', to='profile_page.Profil'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(to='profile_page.Post'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(to='profile_page.Profil'),
            preserve_default=True,
        ),
    ]

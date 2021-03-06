<template>
  <v-container class="pt-0">
    <f-loading v-if="loading" :loading="loading" />
    <template v-if="project && !loading">
      <v-row>
        <v-col cols="12" sm="12" md="8" class="pt-0">
          <project-item :project="project" type="full" />
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <f-panel padding="0" elevation="low" class="detail mb-4">
            <div class="overline px-4 mt-2">MEMBERS</div>
            <v-list>
              <v-list-item v-for="mem in members" :key="mem.id">
                <v-list-item-avatar>
                  <v-img :src="mem.avatar_url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ mem.display_name }}
                  </v-list-item-title>
                  <v-list-item-subtitle> {{ mem.email }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </f-panel>

          <f-panel padding="0" elevation="low" class="detail mb-4">
            <div class="overline px-4 mt-2">REPOSITORIES</div>
            <v-list>
              <v-list-item v-for="repo in repositories" @click="gotoRepo(repo)">
                <v-list-item-avatar>
                  <v-avatar size="32">
                    <v-img width="32" :src="repoIcon(repo)" />
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="body-1"
                    >{{ repo.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="body-2">
                    {{ repo.slug }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>
                    {{ $icons.mdiChevronRight }}
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </f-panel>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "@/mixins/page";
import ProjectItem from "@/components/ProjectItem.vue";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
  components: {
    "project-item": ProjectItem,
  },
})
class ProjectPage extends Mixins(PageView) {
  loading = false;

  projectInfo: any = null;

  get title() {
    return "Project";
  }

  get project() {
    if (this.projectInfo) {
      return this.projectInfo.project;
    }
    return null;
  }

  get members() {
    if (this.projectInfo) {
      return this.projectInfo.members;
    }
    return null;
  }

  get repositories() {
    if (this.projectInfo) {
      return this.projectInfo.repositories;
    }
    return [];
  }

  repoIcon(repo) {
    if (repo.type === "GITHUB") {
      return require("~/assets/images/repo_github.png");
    }
    require("~/assets/images/repo_git.png");
  }

  async mounted() {
    this.loading = true;
    const projId = this.$route.params.id;
    this.projectInfo = await this.$apis.getProject(projId);
    this.loading = false;
  }

  gotoRepo(repo) {
    window.location.href = `https://github.com/${repo.slug}`;
  }
}
export default ProjectPage;
</script>

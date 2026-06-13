<template>
  <!-- Background: subtle warm ambient glow -->
  <div class="bg-layer">
    <div class="bg-glow" />
  </div>

  <!-- App Shell -->
  <div class="app-shell">
    <!-- Status Bar -->
    <header class="status-bar">
      <div class="toolbar-leading">
        <IosButton variant="plain" size="small" @click="toggleTheme">
          <IosIcon :name="isDark ? 'sun-one' : 'moon'" size="16" />
          {{ isDark ? 'Light' : 'Dark' }}
        </IosButton>
      </div>
      <div class="toolbar-title text-headline emphasized">iOS 26 — Vue Components</div>
      <div class="toolbar-trailing" />
    </header>

    <main class="scroll-area" @scroll="onScroll" ref="scrollRef">

      <Transition :name="'tab-slide-' + slideDir" mode="out-in">
        <div :key="'tab-' + activeTab" class="tab-content">

      <!-- ============ Preview Tab: Visual Foundation ============ -->
      <template v-if="activeTab === 'preview'">
        <section class="hero">
          <div class="hero-glass">
            <h1 class="text-large-title emphasized">iOS 26</h1>
            <p class="text-subheadline text-tertiary" style="letter-spacing: 3px; text-transform: uppercase; margin-top: var(--space-1);">Design System</p>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Materials</h2>
          <div class="materials-row">
            <div v-for="m in materials" :key="m.label" :class="['material-chip', m.class]">
              <span class="text-caption1">{{ m.label }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">System Colors</h2>
          <div class="color-grid">
            <div v-for="c in systemColors" :key="c.name" class="color-chip">
              <div class="color-swatch" :style="{ background: c.css }" />
              <span class="text-caption2">{{ c.name }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Typography</h2>
          <div class="glass-card">
            <div v-for="t in typeStyles" :key="t.name" class="type-row">
              <span :class="['type-sample', t.class]">{{ t.label }}</span>
              <span class="text-caption2 text-tertiary type-meta">{{ t.name }} · {{ t.size }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Icons</h2>
          <div class="glass-card">
            <div class="icon-grid">
              <div v-for="name in iconNames" :key="name" class="icon-demo">
                <IosIcon :name="name" size="24" />
                <span class="text-caption2 text-secondary">{{ name }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Avatar</h2>
          <div class="glass-card" style="display:flex;align-items:center;gap:var(--space-4);flex-wrap:wrap;">
            <IosAvatar size="sm" initials="A" />
            <IosAvatar size="md" initials="BC" color="var(--color-blue)" />
            <IosAvatar size="lg" initials="JD" color="var(--color-green)" />
            <IosAvatar size="xl" initials="XL" color="var(--color-purple)" />
            <IosAvatar size="md" />
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Badge</h2>
          <div class="glass-card" style="display:flex;align-items:center;gap:var(--space-5);flex-wrap:wrap;">
            <div style="position:relative;display:inline-block;">
              <IosIcon name="comment" size="24" />
              <IosBadge :value="3" style="position:absolute;top:-6px;right:-8px;" />
            </div>
            <div style="position:relative;display:inline-block;">
              <IosIcon name="message-one" size="24" />
              <IosBadge :value="128" :max="99" style="position:absolute;top:-6px;right:-8px;" />
            </div>
            <IosBadge dot variant="green" />
            <IosBadge value="NEW" variant="blue" />
            <IosBadge :value="5" variant="orange" />
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Card</h2>
          <div style="display:flex;flex-direction:column;gap:var(--space-3);">
            <IosCard variant="glass">
              <div style="padding:var(--space-1);">
                <span class="text-headline">Glass Card</span>
                <p class="text-caption1 text-secondary" style="margin:var(--space-1) 0 0;">Frosted glass with blur backdrop</p>
              </div>
            </IosCard>
            <IosCard variant="solid">
              <div style="padding:var(--space-1);">
                <span class="text-headline">Solid Card</span>
                <p class="text-caption1 text-secondary" style="margin:var(--space-1) 0 0;">Opaque background</p>
              </div>
            </IosCard>
            <IosCard variant="elevated">
              <div style="padding:var(--space-1);">
                <span class="text-headline">Elevated Card</span>
                <p class="text-caption1 text-secondary" style="margin:var(--space-1) 0 0;">Elevated with shadow</p>
              </div>
            </IosCard>
            <IosCard variant="glass" pressable @click="showToast('info')">
              <div style="padding:var(--space-1);">
                <span class="text-headline">Pressable Card</span>
                <p class="text-caption1 text-secondary" style="margin:var(--space-1) 0 0;">Tap me — uses press feedback</p>
              </div>
            </IosCard>
          </div>
        </section>

        <section class="section" style="padding-bottom: var(--space-16);">
          <h2 class="section-label text-footnote emphasized text-secondary">Skeleton</h2>
          <div class="glass-card" style="display:flex;flex-direction:column;gap:var(--space-3);">
            <div style="display:flex;align-items:center;gap:var(--space-3);">
              <IosSkeleton variant="circle" width="44" height="44" />
              <div style="flex:1;display:flex;flex-direction:column;gap:var(--space-2);">
                <IosSkeleton variant="text" width="60%" />
                <IosSkeleton variant="text" width="40%" />
              </div>
            </div>
            <IosSkeleton variant="rect" width="100%" height="120" />
            <div style="display:flex;gap:var(--space-3);">
              <IosSkeleton variant="rounded" width="100" height="80" />
              <IosSkeleton variant="rounded" width="100" height="80" />
              <IosSkeleton variant="rounded" width="100" height="80" />
            </div>
          </div>
        </section>
      </template>

      <!-- ============ Controls Tab: Interactive Controls ============ -->
      <template v-if="activeTab === 'controls'">
        <section class="section" style="padding-top:var(--space-2);">
          <h2 class="section-label text-footnote emphasized text-secondary">Buttons</h2>
          <div class="glass-card">
            <div class="btn-grid">
              <div v-for="v in buttonVariants" :key="v" class="btn-cell">
                <IosButton :variant="v" size="medium">{{ v }}</IosButton>
                <span class="text-caption2 text-tertiary">{{ v }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Chips</h2>
          <div class="glass-card" style="display:flex;flex-wrap:wrap;gap:var(--space-2);">
            <IosChip v-for="(chip, i) in chipData" :key="i" :active="activeChip === i" @click="activeChip = i">
              {{ chip.label }}
            </IosChip>
            <IosChip disabled>Disabled</IosChip>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Controls</h2>
          <div class="glass-card">
            <IosSegmentedControl :segments="['Day', 'Week', 'Month', 'Year']" v-model="segIndex" />
            <div style="height:var(--space-4)" />
            <IosToggle v-model="toggle1" label="Airplane Mode" />
            <div class="separator" />
            <IosToggle v-model="toggle2" label="Wi-Fi" />
            <div class="separator" />
            <IosToggle v-model="toggle3" label="Bluetooth" />
            <div style="height:var(--space-4)" />
            <IosSlider v-model="sliderVal" :min="0" :max="100">
              <template #leading><span class="text-caption1">Vol</span></template>
              <template #trailing><span class="text-caption1 text-secondary">{{ sliderVal }}%</span></template>
            </IosSlider>
            <div style="height:var(--space-4)" />
            <div style="display:flex;flex-direction:column;gap:var(--space-2);">
              <IosCheckbox v-model="check1" label="Notifications" />
              <IosCheckbox v-model="check2" label="Location Services" />
              <IosCheckbox label="Disabled" disabled />
            </div>
            <div style="height:var(--space-4)" />
            <div style="display:flex;flex-direction:column;gap:var(--space-2);">
              <IosRadio v-model="radioVal" value="wifi" label="Wi-Fi" name="network" />
              <IosRadio v-model="radioVal" value="cellular" label="Cellular" name="network" />
              <IosRadio v-model="radioVal" value="both" label="Both" name="network" />
            </div>
            <div style="height:var(--space-4)" />
            <div style="display:flex;align-items:center;gap:var(--space-4);">
              <span class="text-caption1 text-secondary">Quantity</span>
              <IosStepper v-model="stepperVal" :min="0" :max="99" />
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Inputs</h2>
          <div class="glass-card">
            <IosTextField v-model="textVal" label="Name" placeholder="Enter your name" leading-icon="user" clearable />
            <div style="height:var(--space-3)" />
            <IosSearchBar v-model="searchVal" placeholder="Search..." />
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Progress Bar</h2>
          <div class="glass-card" style="position:relative;padding-top:var(--space-6);">
            <IosProgressBar :progress="scrollProgress" :fixed="false" />
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="text-caption2 text-secondary">Page scroll progress</span>
              <span class="text-caption2 emphasized" style="color:var(--color-blue);">{{ scrollProgress }}%</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Circular Progress</h2>
          <div class="glass-card" style="display:flex;align-items:center;gap:var(--space-5);flex-wrap:wrap;">
            <IosCircularProgress :progress="circularVal" :size="72" :stroke-width="7" show-label />
            <IosCircularProgress :progress="circularVal" :size="56" color="var(--color-green)" />
            <IosCircularProgress :progress="circularVal" :size="56" color="var(--color-orange)" />
            <IosCircularProgress :progress="circularVal" :size="56" color="var(--color-red)" />
            <IosSlider v-model="circularVal" :min="0" :max="100" style="flex:1;min-width:var(--space-12);">
              <template #trailing><span class="text-caption1 text-secondary">{{ circularVal }}%</span></template>
            </IosSlider>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Textarea</h2>
          <div class="glass-card">
            <IosTextarea v-model="textareaVal" label="Bio" placeholder="Tell us about yourself..." :rows="3" :maxlength="200" />
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Date & Time</h2>
          <div class="glass-card" style="display:flex;flex-direction:column;gap:var(--space-3);">
            <IosDatePicker v-model="dateVal" label="Birthday" type="date" />
            <IosDatePicker v-model="timeVal" label="Alarm" type="time" />
            <IosDatePicker v-model="datetimeVal" label="Event" type="datetime-local" />
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Picker</h2>
          <div class="glass-card">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span class="text-caption1 text-secondary">Selected: {{ pickerResult }}</span>
              <IosButton variant="filled" size="small" @click="pickerOpen = true">Open Picker</IosButton>
            </div>
          </div>
        </section>

        <section class="section" style="padding-bottom: var(--space-16);">
          <h2 class="section-label text-footnote emphasized text-secondary">Action Sheet</h2>
          <div class="glass-card" style="display:flex;gap:var(--space-2);">
            <IosButton variant="filled" size="small" @click="actionSheetOpen = true">Show Actions</IosButton>
          </div>
        </section>
      </template>

      <!-- ============ Navigation Tab: Navigation & Lists ============ -->
      <template v-if="activeTab === 'navigation'">
        <section class="section" style="padding-top:var(--space-2);">
          <h2 class="section-label text-footnote emphasized text-secondary">Capsule Group</h2>
          <div class="glass-card" style="display:flex;flex-direction:column;gap:var(--space-3);">
            <IosCapsuleGroup v-model="capsule1" :options="['For You', 'Browse', 'Radio', 'Library']" />
            <IosCapsuleGroup v-model="capsule2" :options="['Day', 'Week', 'Month']" />
            <IosCapsuleGroup v-model="capsule3" :options="['Music', 'Podcasts']" />
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">List</h2>
          <IosListSection header="Settings">
            <IosListRow disclosure>
              <template #leading><IosIcon name="aviation" size="20" /></template>
              Airplane Mode
              <template #trailing>Off</template>
            </IosListRow>
            <IosListRow disclosure separator>
              <template #leading><IosIcon name="wifi" size="20" /></template>
              Wi-Fi
              <template #trailing>Home_5G</template>
            </IosListRow>
            <IosListRow disclosure separator>
              <template #leading><IosIcon name="bluetooth" size="20" /></template>
              Bluetooth
              <template #trailing>On</template>
            </IosListRow>
            <IosListRow disclosure>
              <template #leading><IosIcon name="iphone" size="20" /></template>
              Cellular
            </IosListRow>
          </IosListSection>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Table View</h2>
          <IosTableView header="Features" :items="tableItems" footer="More features available in iOS 26." @select="onTableSelect" />
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Action Bar</h2>
          <IosActionBar :items="actionItems" @change="onActionSelect" />
        </section>

        <section class="section" style="padding-bottom: var(--space-16);">
          <h2 class="section-label text-footnote emphasized text-secondary">Pagination</h2>
          <div class="glass-card">
            <IosPagination v-model="currentPage" :total="85" :page-size="10" :max-visible="7" />
            <div style="text-align:center;margin-top:var(--space-2);">
              <span class="text-caption2 text-secondary">Page {{ currentPage }} of 9</span>
            </div>
          </div>
        </section>
      </template>

      <!-- ============ More Tab: Feedback & Settings ============ -->
      <template v-if="activeTab === 'more'">
        <section class="section" style="padding-top:var(--space-2);">
          <h2 class="section-label text-footnote emphasized text-secondary">Charts</h2>
          <div class="glass-card" style="display:flex;flex-direction:column;gap:var(--space-4);">
            <IosChart type="line" :data="lineData" height="200px" :theme="isDark ? 'dark' : 'light'" />
            <IosChart type="bar" :data="barData" height="200px" :theme="isDark ? 'dark' : 'light'" />
            <div style="display:flex;gap:var(--space-4);">
              <IosChart type="doughnut" :data="pieData" height="180px" :theme="isDark ? 'dark' : 'light'" />
              <IosChart type="radar" :data="radarData" height="180px" :theme="isDark ? 'dark' : 'light'" />
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Overlays</h2>
          <div class="glass-card" style="display:flex;gap:var(--space-2);align-items:center;">
            <IosButton variant="filled" @click="alertOpen = true">Alert</IosButton>
            <IosButton variant="plain" @click="sheetOpen = true">Sheet</IosButton>
            <IosButton variant="tinted" @click="onConfirm">Confirm</IosButton>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Toast</h2>
          <div class="glass-card" style="display:flex;gap:var(--space-2);flex-wrap:wrap;">
            <IosButton variant="filled" @click="showToast('success')">Success</IosButton>
            <IosButton variant="tinted" @click="showToast('error')">Error</IosButton>
            <IosButton variant="gray" @click="showToast('warning')">Warning</IosButton>
            <IosButton variant="plain" @click="showToast('info')">Info</IosButton>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Empty State</h2>
          <div class="glass-card">
            <IosEmptyState icon="hourglass-null" title="No Content" description="Your content will appear here once available." action-text="Refresh" @action="console.log('refresh')" />
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Error View</h2>
          <IosErrorView title="Something Went Wrong" message="The operation couldn't be completed. Please try again." @retry="console.log('retry')" @go-home="console.log('home')" />
        </section>

        <section class="section" style="padding-bottom: var(--space-16);">
          <h2 class="section-label text-footnote emphasized text-secondary">Settings</h2>
          <div class="glass-card">
            <IosListSection>
              <IosListRow>
                <template #leading><IosIcon :name="isDark ? 'moon' : 'sun-one'" size="20" /></template>
                Dark Mode
                <template #trailing>
                  <IosButton variant="plain" size="small" @click="toggleTheme">
                    {{ isDark ? 'Disable' : 'Enable' }}
                  </IosButton>
                </template>
              </IosListRow>
              <IosListRow separator disclosure>
                <template #leading><IosIcon name="editor" size="20" /></template>
                Font
                <template #trailing>Inter</template>
              </IosListRow>
              <IosListRow disclosure>
                <template #leading><IosIcon name="setting-one" size="20" /></template>
                Accent Color
                <template #trailing>Blue</template>
              </IosListRow>
            </IosListSection>
          </div>
        </section>
      </template>

        </div>
      </Transition>

      <div class="bottom-spacer" />
    </main>

    <!-- Bottom Tab Bar -->
    <nav class="tabbar-custom">
      <button v-for="t in tabItems" :key="t.id"
        class="tab-item-custom"
        :class="{ active: activeTab === t.id }"
        @click="switchTab(t.id)">
        <IosIcon :name="t.iconName" size="22" />
        <span class="text-caption2">{{ t.label }}</span>
      </button>
    </nav>
  </div>

  <!-- Global Overlays -->
  <IosAlert v-model="alertOpen" title="Face ID & Passcode"
    message="Enter your passcode to access this feature."
    :actions="alertActions" />

  <IosAlert v-model="confirmState.visible" :title="confirmState.title"
    :message="confirmState.message"
    :actions="[
      { label: confirmState.cancelText, style: 'cancel', onclick: handleCancel },
      { label: confirmState.confirmText, style: confirmState.confirmStyle, onclick: handleConfirm },
    ]" />

  <IosSheet v-model="sheetOpen" title="Actions" detent="medium">
    <IosListSection>
      <IosListRow v-for="i in 6" :key="i" disclosure separator>
        Option {{ i }}
      </IosListRow>
    </IosListSection>
  </IosSheet>

  <IosToast />

  <IosPicker v-model="pickerOpen" title="Select Date" :columns="pickerColumns" v-model:selectedIndices="pickerIndices"
    @confirm="pickerOpen = false" />

  <IosActionSheet v-model="actionSheetOpen" title="Choose Action" message="Select an option below"
    :actions="[
      { label: 'Share', style: 'default' },
      { label: 'Copy Link', style: 'default' },
      { label: 'Edit', style: 'default' },
      { label: 'Report', style: 'destructive' },
    ]"
    @select="actionSheetOpen = false" />

  <IosFloatingActionButton v-model:expanded="fabExpanded" position="bottom-right" :offset-x="20" :offset-y="80" :z-index="200">
    <template #actions>
      <div style="display:flex;flex-direction:column;gap:var(--space-1);padding:var(--space-1);">
        <IosButton variant="plain" size="small" @click="onFabAction('New Document')">New Document</IosButton>
        <IosButton variant="plain" size="small" @click="onFabAction('Import')">Import</IosButton>
      </div>
    </template>
  </IosFloatingActionButton>

</template>

<script setup>
import { ref, computed } from 'vue'
import IosButton from './components/IosButton.vue'
import IosSegmentedControl from './components/IosSegmentedControl.vue'
import IosToggle from './components/IosToggle.vue'
import IosSlider from './components/IosSlider.vue'
import IosTextField from './components/IosTextField.vue'
import IosSearchBar from './components/IosSearchBar.vue'
import IosListRow from './components/IosListRow.vue'
import IosListSection from './components/IosListSection.vue'
import IosAlert from './components/IosAlert.vue'
import IosSheet from './components/IosSheet.vue'
import IosCapsuleGroup from './components/IosCapsuleGroup.vue'
import IosChip from './components/IosChip.vue'
import IosProgressBar from './components/IosProgressBar.vue'
import IosPagination from './components/IosPagination.vue'
import IosIcon from './components/IosIcon.vue'
import IosEmptyState from './components/IosEmptyState.vue'
import IosErrorView from './components/IosErrorView.vue'
import IosActionBar from './components/IosActionBar.vue'
import IosFloatingActionButton from './components/IosFloatingActionButton.vue'
import IosToast from './components/IosToast.vue'
import IosTableView from './components/IosTableView.vue'
import IosChart from './components/IosChart.vue'
import IosAvatar from './components/IosAvatar.vue'
import IosBadge from './components/IosBadge.vue'
import IosCard from './components/IosCard.vue'
import IosSkeleton from './components/IosSkeleton.vue'
import IosCircularProgress from './components/IosCircularProgress.vue'
import IosDatePicker from './components/IosDatePicker.vue'
import IosPicker from './components/IosPicker.vue'
import IosTextarea from './components/IosTextarea.vue'
import IosActionSheet from './components/IosActionSheet.vue'
import { useToast } from './composables/useToast.js'
import { useTheme } from './composables/useTheme.js'
import { useConfirm } from './composables/useConfirm.js'

/* ---- Theme ---------------------------------------------------------------- */
const { isDark, toggleTheme } = useTheme()

/* ---- Confirm -------------------------------------------------------------- */
const { state: confirmState, confirm, handleConfirm, handleCancel } = useConfirm()

async function onConfirm() {
  const result = await confirm({
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    confirmStyle: 'destructive',
  })
  addToast(result ? 'Item deleted' : 'Cancelled', result ? 'success' : 'info')
}

/* ---- Scroll --------------------------------------------------------------- */
const scrollY = ref(0)
const scrollRef = ref(null)
function onScroll(e) {
  scrollY.value = e.target.scrollTop
}

const scrollProgress = computed(() => {
  const el = scrollRef.value
  if (!el) return 0
  const maxScroll = el.scrollHeight - el.clientHeight
  return maxScroll > 0 ? Math.round((el.scrollTop / maxScroll) * 100) : 0
})

/* ---- Tab Navigation ------------------------------------------------------ */
const tabItems = [
  { id: 'preview',     label: 'Preview',     iconName: 'home' },
  { id: 'controls',    label: 'Controls',    iconName: 'power' },
  { id: 'navigation',  label: 'Navigation',  iconName: 'planet' },
  { id: 'more',        label: 'More',        iconName: 'application-menu' },
]
const activeTab = ref('preview')
const slideDir = ref('left')
const prevIdx = ref(0)

function switchTab(id) {
  const nextIdx = tabItems.findIndex(t => t.id === id)
  slideDir.value = nextIdx >= prevIdx.value ? 'left' : 'right'
  prevIdx.value = nextIdx
  activeTab.value = id
}

/* ---- Preview data -------------------------------------------------------- */
const materials = [
  { label: 'Chrome', class: 'material-chrome' },
  { label: 'Thick', class: 'material-thick' },
  { label: 'Regular', class: 'material-regular' },
  { label: 'Thin', class: 'material-thin' },
  { label: 'Ultra Thin', class: 'material-ultrathin' },
]

const systemColors = [
  { name: 'Red', css: 'var(--color-red)' },
  { name: 'Orange', css: 'var(--color-orange)' },
  { name: 'Yellow', css: 'var(--color-yellow)' },
  { name: 'Green', css: 'var(--color-green)' },
  { name: 'Mint', css: 'var(--color-mint)' },
  { name: 'Teal', css: 'var(--color-teal)' },
  { name: 'Cyan', css: 'var(--color-cyan)' },
  { name: 'Blue', css: 'var(--color-blue)' },
  { name: 'Indigo', css: 'var(--color-indigo)' },
  { name: 'Purple', css: 'var(--color-purple)' },
  { name: 'Pink', css: 'var(--color-pink)' },
  { name: 'Brown', css: 'var(--color-brown)' },
]

const typeStyles = [
  { name: 'Large Title', class: 'text-large-title', label: 'Large Title', size: '34px' },
  { name: 'Title 1', class: 'text-title1', label: 'Title 1', size: '28px' },
  { name: 'Title 2', class: 'text-title2', label: 'Title 2', size: '22px' },
  { name: 'Title 3', class: 'text-title3', label: 'Title 3', size: '20px' },
  { name: 'Headline', class: 'text-headline', label: 'Headline', size: '17px · Semibold' },
  { name: 'Body', class: 'text-body', label: 'Body', size: '17px' },
  { name: 'Callout', class: 'text-callout', label: 'Callout', size: '16px' },
  { name: 'Subheadline', class: 'text-subheadline', label: 'Subheadline', size: '15px' },
  { name: 'Footnote', class: 'text-footnote', label: 'Footnote', size: '13px' },
  { name: 'Caption 1', class: 'text-caption1', label: 'Caption 1', size: '12px' },
  { name: 'Caption 2', class: 'text-caption2', label: 'Caption 2', size: '11px' },
]

const iconNames = [
  /* Navigation & Actions */
  'home', 'back', 'share', 'up', 'down', 'application-menu',
  'search', 'check', 'close', 'refresh', 'download',
  /* Content & Media */
  'comment', 'comments', 'message-one', 'message-success',
  'message-unread', 'message-emoji', 'music', 'camera',
  'tips-one', 'info', 'attention', 'caution',
  /* Objects */
  'plus', 'minus', 'delete', 'pencil', 'editor', 'copy',
  'power', 'logout', 'inspection', 'setting-one', 'lock', 'unlock',
  'time', 'hourglass-null',
  /* Devices & Network */
  'iphone', 'apple', 'devices', 'aviation', 'wifi', 'close-wifi',
  'bluetooth', 'turn-off-bluetooth',
  /* People & Social */
  'user', 'like', 'planet',
  /* Utilities */
  'map-draw', 'adobe-photoshop',
  /* Theme */
  'sun-one', 'moon',
]

/* ---- Controls data ------------------------------------------------------- */
const buttonVariants = ['filled', 'gray', 'tinted', 'plain']

const chipData = [
  { label: 'Swift' },
  { label: 'UIKit' },
  { label: 'SwiftUI' },
  { label: 'Metal' },
  { label: 'ARKit' },
]
const activeChip = ref(0)

const segIndex = ref(0)
const toggle1 = ref(true)
const toggle2 = ref(false)
const toggle3 = ref(true)
const sliderVal = ref(65)
const textVal = ref('')
const searchVal = ref('')

/* ---- Navigation data ----------------------------------------------------- */
const capsule1 = ref(0)
const capsule2 = ref(1)
const capsule3 = ref(0)

const tableItems = [
  { id: 'airdrop', label: 'AirDrop', iconName: 'aviation' },
  { id: 'shareplay', label: 'SharePlay', iconName: 'share' },
  { id: 'standby', label: 'StandBy', iconName: 'hourglass-null' },
  { id: 'vpn', label: 'VPN & Device Management', subtitle: 'Not Connected', iconName: 'lock' },
]
function onTableSelect(id) {
  console.log('Table item selected:', id)
}

const actionItems = [
  { id: 'edit', iconName: 'pencil', label: 'Edit' },
  { id: 'duplicate', iconName: 'copy', label: 'Duplicate' },
  { id: 'share', iconName: 'share', label: 'Share' },
  { id: 'delete', iconName: 'delete', label: 'Delete' },
]
function onActionSelect(id) {
  console.log('Action selected:', id)
}

const currentPage = ref(1)

/* ---- More tab data ------------------------------------------------------- */
const alertOpen = ref(false)
const sheetOpen = ref(false)
const actionSheetOpen = ref(false)

/* ---- Controls: new demos ------------------------------------------------ */
const circularVal = ref(65)
const textareaVal = ref('')
const dateVal = ref('')
const timeVal = ref('')
const datetimeVal = ref('')
const pickerOpen = ref(false)
const pickerColumns = [
  ['January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'],
  Array.from({ length: 31 }, (_, i) => String(i + 1)),
]
const pickerIndices = ref([0, 14])
const pickerResult = computed(() => {
  return pickerColumns.map((col, i) => col[pickerIndices.value[i] ?? 0]).join(' ')
})

/* ---- Chart demo data ----------------------------------------------------- */
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    { label: 'Revenue', data: [12, 19, 8, 15, 22, 30], borderColor: 'var(--color-blue)', backgroundColor: 'color-mix(in srgb, var(--color-blue) 10%, transparent)', fill: true },
    { label: 'Expenses', data: [8, 11, 13, 12, 16, 18], borderColor: 'var(--color-red)', backgroundColor: 'color-mix(in srgb, var(--color-red) 10%, transparent)', fill: true },
  ],
}

const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    { label: 'Steps', data: [6500, 8200, 7100, 9300, 10200, 12500, 8800], backgroundColor: 'var(--color-blue)' },
  ],
}

const pieData = {
  labels: ['Photos', 'Apps', 'Music', 'Messages', 'Other'],
  datasets: [
    { data: [35, 25, 20, 12, 8], backgroundColor: ['var(--color-blue)', 'var(--color-green)', 'var(--color-orange)', 'var(--color-purple)', 'var(--color-teal)'] },
  ],
}

const radarData = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    { label: 'Model A', data: [85, 90, 78, 92, 88, 95], borderColor: 'var(--color-blue)', backgroundColor: 'color-mix(in srgb, var(--color-blue) 15%, transparent)' },
    { label: 'Model B', data: [70, 85, 92, 80, 75, 88], borderColor: 'var(--color-green)', backgroundColor: 'color-mix(in srgb, var(--color-green) 15%, transparent)' },
  ],
}

const alertActions = [
  { label: 'Cancel', style: 'cancel', onclick: () => {} },
  { label: 'Enter Passcode', style: 'default', onclick: () => {} },
]

const { addToast } = useToast()
function showToast(type) {
  const messages = {
    success: 'Operation completed successfully.',
    error: 'An error occurred. Please try again.',
    warning: 'This action cannot be undone.',
    info: 'Here is some useful information.',
  }
  addToast(messages[type] || 'Toast notification', type, 3000)
}

const fabExpanded = ref(false)
function onFabAction(label) {
  fabExpanded.value = false
  addToast(`${label} action triggered`, 'info')
}
</script>

<style>
/* ===== Background: subtle ambient ===== */
.bg-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.bg-glow {
  position: absolute;
  top: -20%;
  right: -10%;
  width: 40%;
  height: 80%;
  border-radius: 50%;
  background: radial-gradient(ellipse, color-mix(in srgb, var(--color-blue) 3%, transparent) 0%, transparent 70%);
  filter: blur(60px);
}

/* ===== App Shell ===== */
.app-shell {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* ===== Status Bar ===== */
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--space-12);
  padding: 0 var(--space-6);
  flex-shrink: 0;
  z-index: 50;
  background: var(--toolbar-bg);
  border-bottom: var(--separator-height) solid var(--separator);
}
.toolbar-leading, .toolbar-trailing { display: flex; gap: var(--space-2); min-width: var(--space-16); }
.toolbar-trailing { justify-content: flex-end; }
.toolbar-title { flex: 1; text-align: center; }

/* ===== Scroll Area ===== */
.scroll-area {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 0 var(--space-6);
}

/* ===== Hero ===== */
.hero {
  padding: var(--space-10) var(--space-4) var(--space-6);
  text-align: center;
}
.hero-glass {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-10) var(--space-12);
}
/* ===== Sections ===== */
.section { padding: 0 var(--space-4) var(--space-4); }
.section-label {
  padding: 0 var(--space-2) var(--space-3);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: var(--font-family);
}

/* ===== Materials Row ===== */
.materials-row {
  display: flex;
  gap: var(--space-3);
  overflow-x: auto;
  padding: 0 var(--space-1) var(--space-3);
  scrollbar-width: none;
}
.materials-row::-webkit-scrollbar { display: none; }
.material-chip {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  min-width: var(--space-16);
  min-height: var(--btn-height-md);
}

/* ===== Color Grid ===== */
.color-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-2);
}
.color-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-1);
  border-radius: var(--radius-sm);
  background: var(--bg-grouped-secondary);
}
.color-swatch {
  width: var(--space-8); height: var(--space-8);
  border-radius: var(--radius-xs);
  box-shadow: inset 0 0 0 var(--border-hairline) var(--separator);
}

/* ===== Glass Card ===== */
.glass-card {
  padding: var(--space-6);
  border-radius: var(--radius-md);
  background: var(--bg-grouped-secondary);
  border: var(--separator-height) solid var(--separator);
}

/* ===== Typography Rows ===== */
.type-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: var(--space-3) 0;
  border-bottom: var(--separator-height) solid var(--separator);
}
.type-row:last-child { border-bottom: none; }
.type-meta {
  min-width: var(--space-16);
  text-align: right;
  font-family: var(--font-family);
  letter-spacing: 1px;
}

/* ===== Button Grid ===== */
.btn-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
}
.btn-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

/* ===== Icon Grid ===== */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--space-16), 1fr));
  gap: var(--space-4);
}
.icon-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-1);
  text-align: center;
}

/* ===== Separator ===== */
.separator { height: var(--separator-height); background: var(--separator); margin: 0; }

/* ===== Tab Bar ===== */
.tabbar-custom {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: var(--space-2) 0 var(--space-3);
  flex-shrink: 0;
  z-index: 50;
  margin: 0 var(--space-4) var(--space-3);
  border-radius: var(--radius-xl);
  background: var(--tabbar-bg);
  border: var(--separator-height) solid var(--separator);
}
.tab-item-custom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  background: none;
  border: none;
  color: var(--label-tertiary);
  cursor: pointer;
  padding: var(--space-2) var(--space-3) var(--space-1);
  border-radius: var(--radius-md);
  position: relative;
  transition: color var(--duration-normal) var(--ease-default);
  font-family: var(--font-family);
  -webkit-tap-highlight-color: transparent;
}
.tab-item-custom.active { color: var(--color-blue); }
.tab-item-custom.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  border-radius: 1px;
  background: var(--color-blue);
}

.bottom-spacer { height: var(--space-16); }

/* ---- Tab Slide Transition ---- */
.tab-slide-left-enter-active,
.tab-slide-left-leave-active,
.tab-slide-right-enter-active,
.tab-slide-right-leave-active {
  transition: transform var(--duration-slow) var(--ease-editorial), opacity var(--duration-normal) var(--ease-default);
}

.tab-slide-left-enter-from {
  transform: translateX(var(--space-10));
  opacity: 0;
}
.tab-slide-left-leave-to {
  transform: translateX(calc(-1 * var(--space-10)));
  opacity: 0;
}

.tab-slide-right-enter-from {
  transform: translateX(calc(-1 * var(--space-10)));
  opacity: 0;
}
.tab-slide-right-leave-to {
  transform: translateX(var(--space-10));
  opacity: 0;
}

.tab-content {
  will-change: transform, opacity;
}

/* ===== Material chips (demo only) ===== */
.material-chip.material-chrome {
  background: var(--fill-primary);
}
.material-chip.material-thick { background: var(--fill-secondary); }
.material-chip.material-regular { background: var(--fill-tertiary); }
.material-chip.material-thin { background: var(--fill-quaternary); }
.material-chip.material-ultrathin { background: color-mix(in srgb, var(--fill-quaternary) 50%, transparent); }
</style>
